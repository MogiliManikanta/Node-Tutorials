const express = require("express");

const app = express();

const port = 5000;

// app.use((req, res, next) => {
//   if (10 > 20) {
//     next();
//   } else {
//     console.log("your are not allowed");
//   }
// });

const firstHandler = (request, response, next) => {
  if (10 < 20) {
    next();
  } else {
    console.log("your are not allowed");
  }
};

const secondHandler = (request, response, next) => {
  if (10 < 20) {
    next();
  } else {
    console.log("your are not allowed");
  }
};
const thirdHandler = (request, response, next) => {
  if (10 > 20) {
    next();
  } else {
    console.log("your are not allowed");
  }
};

app.get("/home", firstHandler, (request, response) => {
  response.send("This is home page");
});

app.get("/about", secondHandler, (request, response) => {
  response.send("this is about");
});

app.get("/user/:123", thirdHandler, (request, response) => {
  response.send("you searched for 123 user");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  console.log("hello Manikanta");
});
