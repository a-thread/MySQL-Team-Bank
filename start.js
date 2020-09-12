const db = require("./src/db/db");
const inquirer = require("inquirer");
const { printTable } = require("console-table-printer");

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
      "Remove Employee",
      "Update Employee",
      "Update Employee Role",
      "Update Employee Manager",
      "Add Role",
      "Add Department"
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
      case "Remove Employee":
        removeEmp();
        break;
      case "Update Employee":
        updateEmp();
        break;
      case "Update Employee Role":
        empRole();
        break;
      case "Update Employee Manager":
        empMang();
        break;
      case "Add Department":
        addDept();
        break;
      case "Add Role":
        addRole();
        break;
    }
  })
};

// ****  View Functions  ****
// View All Current Employees
function viewAll() {
  db.findAll().then((res) => {
    console.log("Current Employees:")
    printTable(res);
  })
  mainMenu();
};

// View All Departments
function viewDept() {
  db.findDept().then((res) => {
    console.log("Current Departments:")
    printTable(res);
  })
  mainMenu();
};

// View All Roles
function viewRoles() {
  db.getRoles().then((res) => {
    console.log("Current Roles:")
    printTable(res);
  })
  mainMenu();
};


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
}

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
}

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
}

// **** Remove Functions ****
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
}

mainMenu();