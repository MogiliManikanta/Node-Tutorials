const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const jwt = require("jsonwebtoken");

const app = express();

app.use(bodyParser.json());

dotEnv.config();

const secretKey = process.env.mySecretKey;

const users = [
  {
    id: 1,
    name: "Manikanta",
    password: "123456",
    isAdmin: true,
  },
  {
    id: 2,
    name: "Raghu",
    password: "123456",
    isAdmin: false,
  },
];

app.post("/api/login", (req, res) => {
  const { name, password } = req.body;
  const user = users.find((user) => {
    return user.name === name && user.password === password;
  });
  if (user) {
    const accessToken = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      secretKey
    );
    res.json({
      name: user.name,
      isAdmin: user.isAdmin,
      accessToken,
    });
  } else {
    res.status(400).json("user not found");
  }
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
