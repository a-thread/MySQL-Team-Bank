const inquirer = require("inquirer");
const { viewAll, viewDept, viewRoles } = require("./lib/viewFuncs");
const { addRole, addEmp, addDept } = require("./lib/addFuncs");
const { removeEmp, removeDept, removeRole } = require("./lib/deleteFuncs");
const { updateRole } = require("./lib/updateFuncs");
const { connection } = require("./config/connection");

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
            "Add Role",
            "Add Department",
            "Remove Employee",
            "Remove Role",
            "Remove Department",
            "Update Employee Role",
            "Exit",
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
            case "Add Role":
                addRole();
                break;
            case "Add Department":
                addDept();
                break;
            case "Remove Employee":
                removeEmp();
                break;
            case "Remove Role":
                removeRole();
                break;
            case "Remove Department":
                removeDept();
                break;
            case "Update Employee Role":
                updateRole();
                break;
            case "Exit":
                console.log('Goodbye!');
                break;
        }
    })
};

mainMenu();

module.exports = { mainMenu };