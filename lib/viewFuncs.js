// dependencies
const db = require("./db");
const { printTable } = require("console-table-printer");
const inquirer = require("inquirer");

// View All Current Employees
const viewAll = async () => {
  try {
    // requiring mainMenu function
    const { mainMenu } = require("../server");

    // getting all employees
    const allEmp = db.viewAllEmp();

    allEmp.then((res) => {
      console.log("Current Employees:")

      // showing all employees in a table
      printTable(res);

      // calling mainMenu function
      mainMenu();
    })
  } catch (err) {
    console.log(err)
  }
};

// View All Departments
const viewDept = async () => {
  try {
    // requiring mainMenu function
    const { mainMenu } = require("../server")

    // getting all Departments
    const allDept = db.viewDept();

    allDept.then((res) => {
      console.log("Current Departments:")

      // showing departments in a table
      printTable(res);

      // calling mainMenu function
      mainMenu();
    })

  } catch (err) {
    console.log(err)
  }
};

// View All Roles
const viewRoles = async () => {
  try {
    // requiring mainMenu function
    const { mainMenu } = require("../server")

    // getting all Roles
    const allRoles = db.viewRoles();

    allRoles.then((res) => {
      console.log("Current Roles:")

      // showing all Roles in a table
      printTable(res);

      // calling mainMenu function
      mainMenu();
    })
  } catch (err) {
    console.log(err)
  }
};

// View Employees by Manager
const viewEmpMang = async () => {
  try {
    // requiring mainMenu function
    const { mainMenu } = require("../server")

    // getting all Managers
    const mangArr = await db.viewMang();

    const manager = await inquirer.prompt([
      {
        type: "list",
        name: "id",
        message: "Choose Manager to see Employees",
        choices: function () {
          const choiceArr = [];
          // showing each by name
          mangArr.forEach((res) => {
            const mang = {
              name: res.Managers,
              value: res.id // capturing id
            }
            choiceArr.push(mang)
          })
          return choiceArr;
        },
      }
    ]);

    // getting employees via constructor
    await db.viewMangEmp(manager.id)
      .then((res) => {
        console.log("Here are their employees:")

        // showing results in a table
        printTable(res);

        // calling mainMenu
        mainMenu();
      })

  } catch (err) {
    console.log(err)
  }
};

// View Budget by Department
const viewBudget = async () => {
  try {
    // Requiring mainMenu function
    const { mainMenu } = require("../server")

    // getting all Departments
    const deptArr = await db.viewDept();


    const department = await inquirer.prompt([
      {
        type: "list",
        name: "deptId",
        message: "Choose Department to see Budget:",
        choices: function () {
          const choiceArr = [];
          // showing each by name
          deptArr.forEach((res) => {
            const dept = {
              name: res.Department,
              value: res.ID // capturing id
            }
            choiceArr.push(dept)
          })
          return choiceArr;
        },
      }
    ]);

    // getting Dept Salaries via constructor
    await db.viewDeptSal(department.deptId)
      .then((res) => {
        console.log("Current Allocated Budget:");

        // showing results in a table
        printTable(res);

        //calling mainMenu
        mainMenu();
      })

  } catch (err) {
    console.log(err)
  }
};

// exporting all functions
module.exports = { viewAll, viewDept, viewRoles, viewEmpMang, viewBudget };