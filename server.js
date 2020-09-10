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
      "View All Employees by Department",
      "View All Employees by Manager",
      "Add Employee",
      "Remove Employee",
      "Update Employee",
      "Update Employee Role",
      "Update Employee Manager"
    ]
  }).then(function (res) {
    switch (res.startQ) {
      case "View All Employees":
        viewEmp();
        break
    }
  })
};

function viewEmp() {
  db.findAllEmp().then((res) => {
    console.log("Here are your current Employees:")
    printTable(res);
  })
  mainMenu();
};

mainMenu();

// when adding an employee call (viewAllRoles = roles [array] and map over it) and then you'll be able to have your choices set to role choices. That way if you've added a new job it will add to the list automatically. 
