// dependencies
const db = require("./db");
const inquirer = require("inquirer");

// Update Employee Role
const updateRole = async () => {
    try {
        const empArr = await db.viewEmp();
        const roleArr = await db.viewRoles();
        const chosenEmp = await inquirer.prompt([
            {
                type: "list",
                name: "id",
                message: "Choose Employee to Update:",
                choices: function () {
                    const choiceArr = [];
                    empArr.forEach((emp) => {
                        const empId = {
                            name: `${emp.first_name} ${emp.last_name}`,
                            value: emp.id
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
                    roleArr.forEach((res) => {
                        const role = {
                            name: res.Role,
                            value: res.ID
                        }
                        choiceArr.push(role)
                    })
                    return choiceArr;
                },
            },
        ]);
        await db.updateFunc("employee", { role_id: chosenEmp.roleId }, chosenEmp.id);
        console.log(`Role has been updated successfully!`);

        // requiring mainMenu
        const { mainMenu } = require("../start");
        // and calling it!
        mainMenu();


    } catch (err) {
        console.log(err);
    }
};

// Update Employee Manager
const updateMang = async () => {
    try {
        const empArr = await db.viewEmp();
        const mangArr = await db.viewMang();
        const newMang = await inquirer.prompt([
            {
                type: "list",
                name: "id",
                message: "Choose Employee to Update:",
                choices: function () {
                    const choiceArr = [];
                    empArr.forEach((emp) => {
                        const empId = {
                            name: `${emp.first_name} ${emp.last_name}`,
                            value: emp.id
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
                    mangArr.forEach((res) => {
                        const mang = {
                            name: res.Managers,
                            value: res.id
                        }
                        choiceArr.push(mang)
                    })
                    return choiceArr;
                },
            },
        ]);
        await db.updateFunc("employee", { manager_id: newMang.mangId }, newMang.id);
        console.log(`Manager has been updated successfully!`);

        // requiring mainMenu
        const { mainMenu } = require("../start");
        // and calling it!
        mainMenu();


    } catch (err) {
        console.log(err);
    }
};

// Exporting Functions!
module.exports = { updateRole, updateMang };