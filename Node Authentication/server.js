const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const ejs = require("ejs");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const app = express();

dotEnv.config();
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongoDB Database");
  })
  .catch((error) => {
    console.log(`Error while connecting to mongoDB ${error}`);
  });

// Set up MongoDB session store
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "mySessions",
});

// Configure session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false, // Only create session when something is stored
    store: store,
  })
);

// Define port
const PORT = process.env.PORT || 8000;

// Middleware to check if user is authenticated
const checkAuth = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.redirect("/login");
  }
};

// Routes
app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

// Registration route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.redirect("/register"); // Redirect if user already exists
  }

  const hashedPassword = await bcrypt.hash(password, 10); // Hash password

  user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save(); // Save user to database
  res.redirect("/login"); // Redirect to login after registration
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.redirect("/register"); // If user doesn't exist, redirect to register
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.redirect("/login"); // If password is incorrect, redirect to login
  }

  // Set session variables after successful login
  req.session.isAuthenticated = true;
  req.session.user = user;

  req.session.save((err) => {
    if (err) {
      console.log("Error saving session: ", err);
      return res.status(500).send("Server Error");
    }
    res.redirect("/home");
  });
});

// Protected route for authenticated users
app.get("/home", checkAuth, (req, res) => {
  res.render("welcome");
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/login");
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  console.log("hello Manikanta");
});
