// dependencies
const db = require("./db");
const inquirer = require("inquirer");

// Remove Employee
const removeEmp = async () => {
    try {
        const empArr = await db.getEmp();
        const deletedEmp = await inquirer.prompt([
            {
                type: "list",
                name: "id",
                message: "Choose Employee to remove: **NOTE: If this employee is a manager, all of their subs will become managers and CHAOS WILL REIGN SUPREME!**",
                choices: function () {
                    const choiceArr = [];
                    empArr.forEach((emp) => {
                        const rmvEmp = {
                            name: `${emp.first_name} ${emp.last_name}`,
                            value: emp.id
                        }
                        choiceArr.push(rmvEmp)
                    })
                    return choiceArr;
                },
            },
        ]);
        
        await db.deleteFunc("employee", deletedEmp.id);
        
        console.log(`Employee has been removed successfully!`);
        
        const { mainMenu } = require("../start");
        mainMenu();

    } catch (err) {
        console.log(err);
    }
};

// Remove Department
const removeDept = async () => {
    try {
        const deptArr = await db.findDept();
        const deletedDept = await inquirer.prompt([
            {
                type: "list",
                name: "id",
                message: "Choose Department to remove:",
                choices: function () {
                    const choiceArr = [];
                    deptArr.forEach((dept) => {
                        const rmvDept = {
                            name: dept.Department,
                            value: dept.ID
                        }
                        choiceArr.push(rmvDept)
                    })
                    return choiceArr;
                },
            },
        ]);

        await db.deleteFunc("department", deletedDept.id);
        
        console.log(`Department has been removed successfully!`);
        
        const { mainMenu } = require("../start");
        mainMenu();
        
    } catch (err) {
        console.log(err);
    }
};

// Remove Role
const removeRole = async () => {
    try {
        const { mainMenu } = require("../start");
        const roleArr = await db.getRoles();
        const deletedRole = await inquirer.prompt([
            {
                type: "list",
                name: "id",
                message: "Choose Role to remove:",
                choices: function () {
                    const choiceArr = [];
                    roleArr.forEach((role) => {
                        const rmvRole = {
                            name: role.Title,
                            value: role.ID
                        }
                        choiceArr.push(rmvRole)
                    })
                    return choiceArr;
                },
            },
        ]);

        await db.deleteFunc("roles", deletedRole.id);

        console.log(`Role has been removed successfully!`);

        mainMenu();

    } catch (err) {
        console.log(err);
    }
};

module.exports = { removeEmp, removeDept, removeRole };