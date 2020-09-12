const db = require("./db");
const inquirer = require("inquirer");
const { mainMenu } = require("./menu");

// **** Add Functions *****
// Add Employee
const addEmp = async () => {
    try {
        const [rolesArr, empArr] = await Promise.all([db.getRoles(), db.getEmp()])
        const newEmp = await inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "Employee's First Name: ",
            },
            {
                type: "input",
                name: "lastName",
                message: "Employee's Last Name: ",
            },
            {
                type: "list",
                name: "roleId",
                message: "Employee's Role: ",
                choices: function () {
                    const choiceArr = [];
                    rolesArr.forEach((role) => {
                        const roleObj = {
                            name: role.title,
                            value: role.id
                        }
                        choiceArr.push(roleObj)
                    })
                    return choiceArr;
                },
            },
            {
                type: "list",
                message: "Employee's Manager:",
                name: "mangId",
                choices: function () {
                    const choiceArr = [{ name: "None", value: -1 }];
                    empArr.forEach((emp) => {
                        const mgrObj = {
                            name: `${emp.first_name} ${emp.last_name}`,
                            value: emp.id
                        }
                        choiceArr.push(mgrObj)
                    })
                    return choiceArr;
                },
            },
        ]);

        await db.addEmp(newEmp);
        console.log(`${newEmp.firstName} ${newEmp.lastName} has been added successfully!`);
        mainMenu();
    } catch (err) {
        console.log(`Ultimate failure! No employee has been added.`);
        console.log(err);
    }
};

// Add Department
const addDept = async () => {
    try {
        const newDept = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Department Name: ",
            }
        ]);

        await db.addDept(newDept);
        console.log(`${newDept.name} has been added successfully!`);
        mainMenu();
    } catch (err) {
        console.log(`Ultimate failure! No new departments have been added.`);
        console.log(err);
    }
};

// Add Role
const addRole = async () => {
    try {
        const newRole = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Role Name: ",
            },
            {
                type: "input",
                name: "salary",
                message: "Yearly Salary: ",
            }
        ]);

        await db.addRole(newRole);
        console.log(`${newRole.name} has been added successfully!`);
        mainMenu();
    } catch (err) {
        console.log(`Ultimate failure! No new roles have been added.`);
        console.log(err);
    }
};

module.exports = { addRole, addEmp, addDept };