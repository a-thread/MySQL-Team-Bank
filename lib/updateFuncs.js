// dependencies
const db = require("./db");
const inquirer = require("inquirer");

// Update Employee Role
const updateRole = async () => {
    try {

        // getting Employees
        const empArr = await db.viewEmp();

        // getting Roles
        const roleArr = await db.viewRoles();

        const chosenEmp = await inquirer.prompt([
            {
                type: "list",
                name: "id",
                message: "Choose Employee to Update:",
                choices: function () {
                    const choiceArr = [];
                    // displaying each employee by name
                    empArr.forEach((emp) => {
                        const empId = {
                            name: `${emp.first_name} ${emp.last_name}`,
                            value: emp.id // capturing id
                        }
                        choiceArr.push(empId)
                    })
                    return choiceArr;
                },
            },
            {
                type: "list",
                name: "roleId",
                message: "Choose Role:",
                choices: function () {
                    const choiceArr = [];
                    // displaying each role
                    roleArr.forEach((res) => {
                        const role = {
                            name: res.Role,
                            value: res.ID // capturing id
                        }
                        choiceArr.push(role)
                    })
                    return choiceArr;
                },
            },
        ]);

        // Updating role by ID with new Role by ID
        await db.updateFunc("employee", { role_id: chosenEmp.roleId }, chosenEmp.id);
        console.log(`Role has been updated successfully!`);

        // requiring mainMenu
        const { mainMenu } = require("../server");
        // and calling it!
        mainMenu();


    } catch (err) {
        console.log(err);
    }
};

// Update Employee Manager
const updateMang = async () => {
    try {
        // getting all Employees
        const empArr = await db.viewEmp();
        // getting all Managers
        const mangArr = await db.viewMang();
        const newMang = await inquirer.prompt([
            {
                type: "list",
                name: "id",
                message: "Choose Employee to Update:",
                choices: function () {
                    const choiceArr = [];
                    // displaying each employee by name
                    empArr.forEach((emp) => {
                        const empId = {
                            name: `${emp.first_name} ${emp.last_name}`,
                            value: emp.id // capturing id
                        }
                        choiceArr.push(empId)
                    })
                    return choiceArr;
                },
            },
            {
                type: "list",
                name: "mangId",
                message: "Choose New Manager for Employee:",
                choices: function () {
                    const choiceArr = [];
                    // displaying each manager
                    mangArr.forEach((res) => {
                        const mang = {
                            name: res.Managers,
                            value: res.id // capturing id
                        }
                        choiceArr.push(mang)
                    })
                    return choiceArr;
                },
            },
        ]);

        // updating Manager by ID
        await db.updateFunc("employee", { manager_id: newMang.mangId }, newMang.id);
        console.log(`Manager has been updated successfully!`);

        // requiring mainMenu
        const { mainMenu } = require("../server");

        // and calling it!
        mainMenu();

    } catch (err) {
        console.log(err);
    }
};

// Exporting Functions!
module.exports = { updateRole, updateMang };