// dependencies
const db = require("./db");
const { printTable } = require("console-table-printer");

// ****  View Functions  ****
// View All Current Employees
const viewAll = async () => {
  try {
    const { mainMenu } = require("../start");
    const allEmp = db.findAll();
    allEmp.then((res) => {
      console.log("Current Employees:")
      printTable(res);
      mainMenu();
    })
  } catch (err) {
    console.log
  }
};

// View All Departments
const viewDept = async () => {
  try {
    const { mainMenu } = require("../start")
    const allDept = db.findDept();
    allDept.then((res) => {
      console.log("Current Departments:")
      printTable(res);
      mainMenu();
    })
  } catch (err) {
    console.log
  }
};

// View All Roles
const viewRoles = async () => {
  try {
    const { mainMenu } = require("../start")
    const allRoles = db.getRoles();
    allRoles.then((res) => {
      console.log("Current Roles:")
      printTable(res);
      mainMenu();
    })
  } catch (err) {
    console.log
  }
};

module.exports = { viewAll, viewDept, viewRoles };