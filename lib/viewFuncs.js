// dependencies
const db = require("./db");
const { printTable } = require("console-table-printer");
const inquirer = require("inquirer");

// ****  View Functions  ****
// View All Current Employees
const viewAll = async () => {
  try {
    const { mainMenu } = require("../start");
    const allEmp = db.findAll();
    allEmp.then((res) => {
      console.log("Current Employees:")
      printTable(res);
      mainMenu();
    })
  } catch (err) {
    console.log(err)
  }
};

// View All Departments
const viewDept = async () => {
  try {
    const { mainMenu } = require("../start")
    const allDept = db.findDept();
    allDept.then((res) => {
      console.log("Current Departments:")
      printTable(res);
      mainMenu();
    })
  } catch (err) {
    console.log(err)
  }
};

// View All Roles
const viewRoles = async () => {
  try {
    const { mainMenu } = require("../start")
    const allRoles = db.getRoles();
    allRoles.then((res) => {
      console.log("Current Roles:")
      printTable(res);
      mainMenu();
    })
  } catch (err) {
    console.log(err)
  }
};

// View Employees by Manager
const viewEmpMang = async () => {
  try {
    const { mainMenu } = require("../start")
    const mangArr = await db.getMang();
    const manager = await inquirer.prompt([
      {
        type: "list",
        name: "id",
        message: "Choose Manager to see Employees",
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
      }
    ]);
    await db.getMangEmp(manager.id)
      .then((res) => {
        console.log("Here are their employees:")
        printTable(res);
        mainMenu();
      })

  } catch (err) {
    console.log(err)
  }
}

module.exports = { viewAll, viewDept, viewRoles, viewEmpMang };