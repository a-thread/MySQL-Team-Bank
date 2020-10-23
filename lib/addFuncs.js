const db = require("./db");
const inquirer = require("inquirer");

// **** Add Functions ****
// Add Employee
const addEmp = async () => {
    try {

        // getting mainMenu function
        const { mainMenu } = require("../server");

        // getting constructor functions for Roles and Managers
        const [rolesArr, mangArr] = await Promise.all([db.viewRoles(), db.viewMang()]);

        // prompting user with new employee questions
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
                    // going over each role to get title and id
                    rolesArr.forEach((role) => {
                        const roleObj = {
                            name: role.Role,
                            value: role.ID
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
                    // if they don't have a manager, we will make the value easy to find
                    const choiceArr = [{ name: "None", value: -1 }];
                    // going over each manager to get name and id
                    mangArr.forEach((mang) => {
                        const mgrObj = {
                            name: mang.Managers,
                            value: mang.id
                        }
                        choiceArr.push(mgrObj)
                    })
                    return choiceArr;
                },
            },
        ]);

        // putting the newEmp object into addEmp constructor
        await db.addEmp(newEmp);

        // Logging Success
        console.log(`Employee has been added successfully!`);

        // Calling mainMenu Function
        mainMenu();
    } catch (err) {
        console.log(err);
    }
};

// Add Department
const addDept = async () => {
    try {

        // getting mainMenu function
        const { mainMenu } = require("../server");

        // asking for new Dept name
        const newDept = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Department Name: ",
            }
        ]);

        // putting new department into constructor
        await db.addDept(newDept);

        // logging success
        console.log(`${newDept.name} has been added successfully!`);

        // calling mainMenu function
        mainMenu();

    } catch (err) {
        console.log(err);
    }
};

// Add Role
const addRole = async () => {
    try {

        // getting mainMenu function
        const { mainMenu } = require("../server");

        // getting all Departments
        const deptArr = await db.viewDept();

        // asking for new role with salary info before asking user to assign a department
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
            },
            {
                type: "list",
                message: "Choose Department for new Role:",
                name: "dept",
                choices: function () {
                    // going over each dept to get name and id
                    deptArr.forEach((dept) => {
                        const deptId = {
                            name: dept.Department,
                            value: dept.ID
                        }
                        choiceArr.push(deptId)
                    })
                    return choiceArr;
                },
            },
        ]);

        // adding role via constructor
        await db.addRole(newRole);

        // logging success
        console.log(`${newRole.name} has been added successfully!`);

        // calling mainMenu
        mainMenu();

    } catch (err) {
        console.log(err);
    }
};

// exporting functions
module.exports = { addRole, addEmp, addDept };