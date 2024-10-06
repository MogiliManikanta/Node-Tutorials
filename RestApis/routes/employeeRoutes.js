const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const Employee = require("../models/Employee");

//get , post, put/patch, delete

router.post("/add-emp", employeeController.createEmployee);

module.exports = router;
