// const Empolyee = require("../models/Empolyee");
// const Employee = require("../models/Employee"); // Adjust the path as necessary
const Employee = require("../models/Employee"); // Ensure correct path and capitalization

const createEmployee = async (req, res) => {
  try {
    const { name, email, phone, city } = req.body;

    const employee = new Employee({
      name,
      email,
      phone,
      city,
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.log("there is error : ", error);
    res.status(500).json({ message: error });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error("there is an error :", error);
    res.status(500).json({ message: "server Error" });
  }
};

const singleEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      res.status(404).json({ message: "Employee Id not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("there is an error :", error);
    res.status(500).json({ message: "server Error" });
  }
};

const updateEmploye = async (req, res) => {
  try {
    const { name, email, phone, city } = req.body;

    const myEmployee = await Employee.findByIdAndUpdate(req.params.id, {
      name,
      email,
      phone,
      city,
    });
    if (!myEmployee) {
      return res.status(404).json({ message: "Employee Id not Found" });
    }
    res.status(200).json(myEmployee);
  } catch (error) {
    console.error("there is an error :", error);
    res.status(500).json({ message: "server Error" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee Id not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("there is an error :", error);
    res.status(500).json({ message: "server Error" });
  }
};

module.exports = {
  createEmployee,
  updateEmploye,
  getEmployees,
  singleEmployee,
  deleteEmployee,
};
