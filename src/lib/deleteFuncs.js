const db = require("./db");
const inquirer = require("inquirer");
const { mainMenu } = require("./menu");

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

        await db.delete("employee", deletedEmp.id);
        console.log(`Employee has been removed successfully!`);
        mainMenu();
    } catch (err) {
        console.log(`Ultimate failure! No employee has been removed.`);
        console.log(err);
    }
};

module.exports = { removeEmp };