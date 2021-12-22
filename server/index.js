const express = require("express");
const router = require("./src/routers");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
