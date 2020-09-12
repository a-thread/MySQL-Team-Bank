const inquirer = require("inquirer");
const { viewAll, viewDept, viewRoles } = require("./viewFuncs");
const { addRole, addEmp, addDept } = require("./addFuncs");
const { removeEmp } = require("./deleteFuncs");

function mainMenu() {
    inquirer.prompt({
        type: "list",
        name: "startQ",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Departments",
            "View All Roles",
            "Add Employee",
            "Remove Employee",
            "Update Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Add Role",
            "Add Department"
        ]
    }).then(function (res) {
        switch (res.startQ) {
            case "View All Employees":
                viewAll();
                break;
            case "View All Departments":
                viewDept();
                break;
            case "View All Roles":
                viewRoles();
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
            case "Add Department":
                addDept();
                break;
            case "Add Role":
                addRole();
                break;
        }
    })
};

module.exports = mainMenu();