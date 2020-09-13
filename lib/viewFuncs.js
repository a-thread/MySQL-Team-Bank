// dependencies
const db = require("./db");
const { printTable } = require("console-table-printer");
const inquirer = require("inquirer");

// View All Current Employees
const viewAll = async () => {
  try {
    const { mainMenu } = require("../start");
    const allEmp = db.viewAllEmp();
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
    const allDept = db.viewDept();
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
    const allRoles = db.viewRoles();
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
    const mangArr = await db.viewMang();
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
    await db.viewMangEmp(manager.id)
      .then((res) => {
        console.log("Here are their employees:")
        printTable(res);
        mainMenu();
      })

  } catch (err) {
    console.log(err)
  }
};

// View Budget by Department
const viewBudget = async () => {
  try {
    const { mainMenu } = require("../start")
    const deptArr = await db.viewDept();
    const department = await inquirer.prompt([
      {
        type: "list",
        name: "deptId",
        message: "Choose Department to see Budget:",
        choices: function () {
          const choiceArr = [];
          deptArr.forEach((res) => {
            const dept = {
              name: res.Department,
              value: res.ID
            }
            choiceArr.push(dept)
          })
          return choiceArr;
        },
      }
    ]);
    await db.viewDeptSal(department.deptId)
      .then((res) => {
        console.log("Current Allocated Budget:");
        printTable(res);
        mainMenu();
      })

  } catch (err) {
    console.log(err)
  }
};

// exporting all functions
module.exports = { viewAll, viewDept, viewRoles, viewEmpMang, viewBudget };