const { default: axios } = require("axios");
const { user, poke, user_poke } = require("../../../models");

exports.getListPoke = async (req, res) => {
  try {
    const getListPoke = await poke.findAll();
    res.status(200).send({
      status: "success",
      message: "Data has been received",
      data: "getListPoke",
    });
  } catch (e) {
    req.status(500).send({
      status: "failed",
      message: "gabisasu",
    });
  }
};
exports.getDetailPoke = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
      //   data: JSON.stringify(payload)
    });

    const getData = response.data;
    console.log("getdata", getData);

    // ADD TO MODEL
    // const createPoke = await poke.create({
    //   name: getData.species.name,
    //   image: getData.sprites.other.dream_world.front_default,
    //   height: getData.height,
    //   weight: getData.weight
    // });
    res.status(200).send({
      status: "success",
      message: "data telah diterima",
      data: { getData },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: error.message,
    });
  }
};

exports.addPoke = async (req, res) => {
  try {
    const { type, name } = req.body;

    const createPoke = await poke.create({
      ...req.body,
    });

    res.send({
      status: "success",
      message: "Pokemon berhasil di tambahkan",
      data: createPoke,
    });
  } catch (error) {
    res.status(404).send({
      status: "error",
      message: error.message,
    });
  }
};

exports.catchPokemon = async (req, res) => {
  const { user_id, poke_id, name } = req.body;
  try {
    // to gerate a randome rounded number between 1 to 10;
    const probability = Math.random() < 0.5 ? 0 : 1;

    // function isEven(probability) {
    //   if (probability % 2 == 0) {
    //     return "genap";
    //   } else {
    //     return "ganjil";
    //   }
    // }

    console.log("iseven", isEven(probability));

    if (probability === 0) {
      return res.status(404).send({
        status: "failed",
        message: `You Failed Catch Pokemon because your random number is ${probability} it's odd number`,
      });
    }
    const findUser = await user.findOne({
      where: { id: user_id },
    });

    const findPoke = await poke.findAll({
      where: { id: poke_id },
    });

    const catchUserPoke = await user_poke.create({
      userId: user_id,
      pokeId: poke_id,
      name: name,
    });

    const getUser = await user.findAll({
      where: { id: user_id },
      include: {
        model: poke,
        as: "pokes",
      },

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "success",
      message: `Congratulations You Have Catched Pokemon, Your Number is ${theRandomNumber} its even number`,
      data: getUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

exports.releasePokemon = async (req, res) => {
  const { user_id, poke_id } = req.body;
  try {
    // to gerate a randome rounded number between 1 to 10;
    const theRandomNumber = Math.floor(Math.random() * 100) + 1;
    console.log("angka acak", theRandomNumber);

    function isPrime(theRandomNumber) {
      if (
        theRandomNumber == 2 ||
        theRandomNumber == 3 ||
        theRandomNumber == 5 ||
        theRandomNumber == 7 ||
        (theRandomNumber % 2 != 0 &&
          theRandomNumber % 3 != 0 &&
          theRandomNumber % 5 != 0 &&
          theRandomNumber % 7 != 0)
      ) {
        return "prime";
      } else {
        return "notPrime";
      }
    }
    console.log("isPrime", isPrime(theRandomNumber));
    if (isPrime(theRandomNumber) === "notPrime") {
      return res.status(404).send({
        status: "Vice Versa",
        message: `You Have Failed to Release Pokemon because your random number is ${theRandomNumber}, its not prime`,
      });
    }
    const findUser = await user.findOne({
      where: { id: user_id },
    });

    const findPoke = await poke.findAll({
      where: { id: poke_id },
    });

    const catchUserPoke = await user_poke.destroy({
      where: { userId: user_id, pokeId: poke_id },
    });

    const getUser = await user.findAll({
      where: { id: user_id },
      include: {
        model: poke,
        as: "pokes",
      },

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "success",
      message: `You Have Released Your Pokemon because your random number is ${theRandomNumber} it's prime!`,
      data: getUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

exports.getUserCatchedPoke = async (req, res) => {
  const { user_id } = req.body;
  try {
    let i;
    let fib = []; // Initialize array!

    fib[0] = 0;
    fib[1] = 1;
    for (i = 2; i <= 10; i++) {
      // Next fibonacci number = previous + one before previous

      // Translated to JavaScript:
      fib[i] = fib[i - 1] + fib[i - 2];
    }
    console.log(fib[3]);

    const getUser = await user.findAll({
      include: [
        {
          model: poke,
          through: user_poke,
          as: "pokes",
          attributes: {
            exclude: ["user_poke"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: { id: user_id },
    });

    res.status(200).send({
      status: "success",
      message: "Here's Your Pokemon List",
      data: getUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

let tempPika = [];

exports.renamePoke = async (req, res) => {
  const { user_id, poke_id } = req.params;
  const { name } = req.body;

  try {
    const fibonacci = (n) =>
      Array.from({ length: n }).reduce(
        (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
        []
      );

    const generatePika = () => {
      const listFibo = fibonacci(tempPika.length + 1);
      const indexLocation = tempPika.length - 1;

      tempPika.push(
        name + listFibo[indexLocation >= 0 ? indexLocation + 1 : 0]
      );
    };

    generatePika();
    console.log("nnama", tempPika);
    const update = await poke.update(
      { name: tempPika[-1] },
      {
        where: { id: poke_id },
      }
    );
    // let i;
    // let fib = []; // Initialize array!

    // fib[0] = 0;
    // fib[1] = 1;
    // for (i = 2; i <= 10; i++) {
    //   fib[i] = fib[i - 1] + fib[i - 2];
    // }
    // const deleteArray = fib.shift();
    // console.log(deleteArray);
    // const getData = {
    //   name: name
    // };
    // console.log(getData);
    // const update = await user_poke.update(getData, {
    //   where: { userId: user_id, pokeId: poke_id }
    // });

    res.status(200).send({
      status: "success",
      message: "You Have Changed Your Pokemon Name",
      data: tempPika,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};
