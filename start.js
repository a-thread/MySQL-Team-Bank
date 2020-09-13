// dependencies
const inquirer = require("inquirer");
const { viewAll, viewDept, viewRoles, viewEmpMang, viewBudget } = require("./lib/viewFuncs");
const { addRole, addEmp, addDept } = require("./lib/addFuncs");
const { removeEmp, removeRole } = require("./lib/deleteFuncs");
const { updateRole, updateMang } = require("./lib/updateFuncs");

// main menu function
function mainMenu() {
    // main menu prompts
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
            "Update Employee Manager",
            "View Employees by Manager",
            "View the total budget of a department",
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
            case "Update Employee Manager":
                updateMang();
                break;
                break;
            case "View Employees by Manager":
                viewEmpMang();
                break;
            case "View the total budget of a department":
                viewBudget();
                break;
            case "Exit":
                console.log('Goodbye!');
        }
    })
};


function welcome() {
    console.log(` xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`);
    console.log(` xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`);
    console.log(`            `);
    console.log(`   Welcome to Aiden's MySql Team Bank`);
    console.log(`            `);
    console.log(` xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`);
    console.log(` xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`);
    console.log(`            `);
};

function init() {
    welcome();
    mainMenu();
}

init();


module.exports = { mainMenu };