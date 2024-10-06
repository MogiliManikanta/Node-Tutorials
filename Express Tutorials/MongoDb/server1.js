const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
dotEnv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongosee Data base");
  })
  .catch((error) => {
    console.log(`Error while connecting to mongoDB ${error}`);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  console.log("hello Manikanta");
});
