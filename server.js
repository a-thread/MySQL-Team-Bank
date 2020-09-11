const db = require("./database/db");
const inquirer = require("inquirer");
const { printTable } = require("console-table-printer");

function mainMenu() {
  inquirer.prompt({
    type: "list",
    name: "startQ",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View All Departments",
      "View All Managers",
      "Add Employee",
      "Remove Employee",
      "Update Employee",
      "Update Employee Role",
      "Update Employee Manager"
    ]
  }).then(function (res) {
    switch (res.startQ) {
      case "View All Employees":
        viewAll();
        break;
      case "View All Departments":
        viewDept();
        break;
      case "View All Managers":
        viewMang();
        break;
      case "Add Employee":
        addEmp();
        break;
      case "Remove Employee":
        removeEmp();
        break;
      case "Update Employee":
        updateEmp();
        break;
      case "Update Employee Role":
        empRole();
        break;
      case "Update Employee Manager":
        empMang();
        break;
    }
  })
};

function viewAll() {
  db.findAll().then((res) => {
    console.log("Current Employees:")
    printTable(res);
  })
  mainMenu();
};

function viewDept() {
  db.findDept().then((res) => {
    console.log("Current Departments:")
    printTable(res);
  })
  mainMenu();
};

mainMenu();

// when adding an employee call (viewAllRoles = roles [array] and map over it) and then you'll be able to have your choices set to role choices. That way if you've added a new job it will add to the list automatically. 
