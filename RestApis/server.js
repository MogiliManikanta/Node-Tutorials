const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const empoleeRoutes = require("../routes/empolyeeRoutes");
const employeeRoutes = require("./routes/employeeRoutes"); // Corrected path
const ejs = require("ejs");

const app = express();
const PORT = process.env.PORT || 5000;

dotEnv.config();
app.use(bodyParser.json());
// app.set("ejs", ejs);
app.set("view engine", "ejs");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongosee Data base");
  })
  .catch((error) => {
    console.log(`Error while connecting to mongoDB ${error}`);
  });

// app.use("/empolyees", empolyeeRoutes);
// app.use("/empolyees", empolyeeRoutes);
app.use("/employees", employeeRoutes); // Corrected both the path and the variable name

app.get("/apple", (request, response) => {
  // response.json({ fruits: ["apple", "banana"] });
  response.send("hello apple");
});

app.get("/orange", (request, response) => {
  response.send("hello orange");
});
// app.get("/html", (req, res) => {
//   res.render("htmlpage.ejs");
// });
// Render HTML page using EJS
app.get("/html", (req, res) => {
  res.render("htmlpage"); // No need for .ejs extension
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  console.log("hello Manikanta");
});
