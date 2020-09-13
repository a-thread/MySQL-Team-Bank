// dependencies
const db = require("./db");
const inquirer = require("inquirer");

// Update Employee Role
const updateRole = async () => {
    try {
        const empArr = await db.getEmp();
        const roleArr = await db.getRoles();
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
                            name: res.Title,
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

module.exports = { updateRole };