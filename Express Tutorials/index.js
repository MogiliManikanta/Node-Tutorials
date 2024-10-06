const express = require("express");

const app = express();

const port = 5000;

app.get("/apple", (request, response) => {
  response.send("hello apple");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  console.log("hello Manikanta");
});
