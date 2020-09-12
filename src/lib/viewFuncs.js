const db = require("./db");
const { printTable } = require("console-table-printer");
const { mainMenu } = require("./menu");

// ****  View Functions  ****
// View All Current Employees
function viewAll() {
    db.findAll().then((res) => {
      console.log("Current Employees:")
      printTable(res);
    })
    mainMenu();
  };
  
  // View All Departments
  function viewDept() {
    db.findDept().then((res) => {
      console.log("Current Departments:")
      printTable(res);
    })
    mainMenu();
  };
  
  // View All Roles
  function viewRoles() {
    db.getRoles().then((res) => {
      console.log("Current Roles:")
      printTable(res);
    })
    mainMenu();
  };

  module.exports = { viewAll, viewDept, viewRoles };