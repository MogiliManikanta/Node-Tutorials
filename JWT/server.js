const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");

const app = express();

app.use(bodyParser.json());
app.use(express.json());

dotEnv.config();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
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

const verifyUser = (req, res, next) => {
  const userToken = req.headers["authorization"];
  if (userToken) {
    const token = userToken.split(" ")[1]; // Extract the actual token from "Bearer <token>"

    // Corrected this line to use the extracted token
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ err: "Invalid token" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(403).json("You are not authorized, invalid token");
  }
};

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
    res.status(400).json("User not found");
  }
});

app.delete("/api/users/:userId", verifyUser, (req, res) => {
  const userId = parseInt(req.params.userId); // Convert userId from URL to number for comparison

  if (req.user.id === userId || req.user.isAdmin) {
    res.status(200).json("User deleted");
  } else {
    res.status(403).json("You can delete only your account");
  }
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
