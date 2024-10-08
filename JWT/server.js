const express = require("express");
const dotEnv = require("dotenv");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotEnv.config();
app.set("view engine", "ejs");

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
    const token = userToken.split(" ")[1];
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
  const userId = parseInt(req.params.userId);
  if (req.user.id === userId || req.user.isAdmin) {
    res.status(200).json("User deleted");
  } else {
    res.status(403).json("You can delete only your account");
  }
});

app.get("/manikanta", (req, res) => {
  res.render("manikanta");
});

app.get("/raghu", (req, res) => {
  res.render("raghu");
});

app.get("/api/login/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  if (userId) {
    if (userId === 1) {
      res.redirect("/manikanta");
    } else if (userId === 2) {
      res.redirect("/raghu");
    } else {
      res.status(400).json("User not found");
    }
  }
});

app.post("/api/logout", (req, res) => {
  const userToken = req.headers.authorization;
  if (userToken) {
    const token = userToken.split(" ")[1];
    if (token) {
      // Assuming allTokens is an array stored globally
      const tokenIndex = allTokens.indexOf(token);
      if (tokenIndex !== -1) {
        allTokens.splice(tokenIndex, 1);
        res.status(200).json("Logged out successfully");
      } else {
        res.status(403).json("You are not a valid user");
      }
    } else {
      res.status(403).json("Token not found");
    }
  } else {
    res.status(403).json("You are not authenticated");
  }
});

app.get("/api/logout", (req, res) => {
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("welcome");
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
