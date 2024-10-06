const express = require("express");
const dotEnv = require("dotenv");

// const { mongoClient } = require("mongodb");
const { MongoClient } = require("mongodb");

const app = express();

dotEnv.config();

MongoClient.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log("Error while connecting to mongoDB", err);
  });

console.log(process.env);

const port = 6000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
  console.log("hello Manikanta");
});
