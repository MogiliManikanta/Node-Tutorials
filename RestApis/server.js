const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const empoleeRoutes = require("../routes/empolyeeRoutes");
const employeeRoutes = require("./routes/employeeRoutes"); // Corrected path

const app = express();
const PORT = process.env.PORT || 5000;

dotEnv.config();
app.use(bodyParser.json());

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

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  console.log("hello Manikanta");
});
