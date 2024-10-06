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

module.exports = { createEmployee };
