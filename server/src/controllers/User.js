const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user } = require("../../models/");

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    //validate
    const schema = joi.object({
      name: joi.string().min(4).required(),
      email: joi.string().email().min(8).required(),
      password: joi.string().min(6).required(),
    });
    const { error } = await schema.validate(req.body);
    if (error) {
      return res.status(404).send({
        status: "failed",
        message: error.details[0].message,
      });
    }

    // Checking Users
    const checkUsers = await user.findOne({
      where: { email },
    });
    if (checkUsers) {
      return res.send({
        status: "failed",
        message: "Email and password have been registered",
      });
    }
    // encrypt password
    const passwordStrength = 10;
    const passwordHashed = await bcrypt.hash(password, passwordStrength);
    // Create User
    const createUser = await user.create({
      name: name,
      email: email,
      password: passwordHashed,
    });
    // token
    const token = jwt.sign(
      { User: createUser.id },
      process.env.ACCESS_TOKEN_SECRET
    );
    const username = createUser.name;

    res.send({
      status: "Success",
      message: "Success register",
      data: {
        user: createUser,
        token,
      },
    });
  } catch (e) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const schema = joi.object({
      email: joi.string().email().min(6).required(),
      password: joi.string().min(8).required(),
    });
    const { error } = await schema.validate(req.body);
    if (error) {
      return res.status(404).send({
        status: "failed",
        message: error.details[0].message(),
      });
    }
    const getUser = await user.findOne({
      where: { email },
    });
    if (!getUser) {
      return res.status(404).send({
        status: "failed",
        message: "Email or password is wrong, Please try again!",
      });
    }
    const token = jwt.sign(
      { email: getUser.email },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.send({
      status: "Success",
      data: {
        user: getUser,
        token,
      },
    });
  } catch (e) {
    res.status(500).send({
      status: "error",
      message: e.message,
    });
  }
};
