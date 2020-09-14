// dependencies
const db = require("./db");
const inquirer = require("inquirer");

// Remove Employee
const removeEmp = async () => {
    try {
        // getting all Employees
        const empArr = await db.viewEmp();
        const deletedEmp = await inquirer.prompt([
            {
                type: "list",
                name: "id",
                message: "Choose Employee to remove: **NOTE: If this employee is a manager, all of their subs will become managers and CHAOS WILL REIGN SUPREME!**",
                choices: function () {
                    const choiceArr = [];
                    // displaying each employee by name
                    empArr.forEach((emp) => {
                        const rmvEmp = {
                            name: `${emp.first_name} ${emp.last_name}`,
                            value: emp.id // capturing id
                        }
                        choiceArr.push(rmvEmp)
                    })
                    return choiceArr;
                },
            },
        ]);

        // deleting Employee from database by id
        await db.deleteFunc("employee", { id: deletedEmp.id });

        // loggin success
        console.log(`Employee has been removed successfully!`);

        // requiring mainMenu
        const { mainMenu } = require("../start");
        // calling it
        mainMenu();

    } catch (err) {
        console.log(err);
    }
};

// Remove Department
const removeDept = async () => {
    try {
        // getting all Departments
        const deptArr = await db.viewDept();
        const deletedDept = await inquirer.prompt([
            {
                type: "list",
                name: "id",
                message: "Choose Department to remove:",
                choices: function () {
                    const choiceArr = [];
                    // displaying each dept by name
                    deptArr.forEach((dept) => {
                        const rmvDept = {
                            name: dept.Department,
                            value: dept.ID // capturing ID
                        }
                        choiceArr.push(rmvDept)
                    })
                    return choiceArr;
                },
            },
        ]);

        // Deleting Department by ID
        await db.deleteFunc("department", { id: deletedDept.id });

        // Logging succcess
        console.log(`Department has been removed successfully!`);

        // Requiring Main Menu
        const { mainMenu } = require("../start");

        // Calling Main Menu
        mainMenu();

    } catch (err) {
        console.log(err);
    }
};

// Remove Role
const removeRole = async () => {
    try {

        // requiring Main Menu
        const { mainMenu } = require("../start");

        // getting all Roles
        const roleArr = await db.viewRoles();
        const deletedRole = await inquirer.prompt([
            {
                type: "list",
                name: "id",
                message: "Choose Role to remove:",
                choices: function () {
                    const choiceArr = [];
                    // showing each existing role
                    roleArr.forEach((role) => {
                        const rmvRole = {
                            name: role.Role,
                            value: role.ID // caputuring id
                        }
                        choiceArr.push(rmvRole)
                    })
                    return choiceArr;
                },
            },
        ]);

        // deleting Role by ID
        await db.deleteFunc("roles", { id: deletedRole.id });

        // logging success
        console.log(`Role has been removed successfully!`);

        // Calling mainMenu function
        mainMenu();

    } catch (err) {
        console.log(err);
    }
};

// exporting functions
module.exports = { removeEmp, removeRole, removeDept };