// requiring connection
const connection = require("../config/connection");

class Db {
    // starting connection
    constructor() {
        this.connection = connection;
    }

    // query of all employees including: Id, Name, Role, Salary, Department, & Manager
    viewAll() {
        return this.connection.query(`SELECT employee.id AS ID, CONCAT( employee.first_name, " ", employee.last_name ) AS Employee, title AS Title, salary AS Salary, dept_name AS Department, CONCAT( m.first_name, " ", m.last_name ) AS Manager
        FROM employee
        LEFT JOIN roles ON employee.role_id = roles.id
        LEFT JOIN department ON roles.dept_id = department.id
        LEFT JOIN employee m ON m.id = employee.manager_id`)
    }

    // query of all Departments
    viewDept() {
        return this.connection.query(`SELECT id AS ID, dept_name AS Department FROM department`)
    }

    // query of all Roles
    viewRoles() {
        return this.connection.query(`SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, department.dept_name AS "Department"
        FROM roles
        LEFT JOIN department ON roles.dept_id = department.id`)
    }

    // query of all Employees with role_id
    viewEmp() {
        return this.connection.query(`SELECT employee.id, employee.first_name, employee.last_name, employee.role_id FROM employee`)
    }

    // query of all Managers
    viewMang() {
        return this.connection.query(`Select employee.id, CONCAT( employee.first_name, " ", employee.last_name) AS Managers 
        FROM employee 
        WHERE employee.manager_id IS NULL`)
    }

    // query to get Employees by Manager ID
    viewMangEmp(mgrId) {
        return this.connection.query(`SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS Employee, roles.title AS Role, department.dept_name AS Department
        FROM employee
        LEFT JOIN roles ON employee.role_id = roles.id
        LEFT JOIN department ON roles.dept_id = department.id
        WHERE employee.manager_id = ?`, mgrId)
    }

    // Shows Total Budget by Department ID
    viewDeptSal(deptId) {
        return this.connection.query(`SELECT department.dept_name AS "Department", SUM(roles.salary) AS "Total Budget"
        FROM (employee
        INNER JOIN roles ON employee.role_id = roles.id
        INNER JOIN department ON roles.dept_id = department.id)
        WHERE department.id = ?
        GROUP BY department`, deptId)
    }

    // Adds an Employee
    addEmp(emp) {
        if (emp.mangId === -1) {
            return this.connection.query('INSERT INTO employee SET ?', { first_name: emp.firstName, last_name: emp.lastName, role_id: emp.roleId });
        } else {
            return this.connection.query('INSERT INTO employee SET ?', { first_name: emp.firstName, last_name: emp.lastName, role_id: emp.roleId, manager_id: emp.mangId });
        }
    }

    // Adds a Department
    addDept(newDept) {
        return this.connection.query('INSERT INTO department SET ?', { dept_name: newDept.name });
    }

    // Adds a Role
    addRole(newRole) {
        return this.connection.query('INSERT INTO roles SET ?', { title: newRole.name, salary: newRole.salary, dept_id: newRole.dept });
    }

    // Deletes anything from any table by id #
    deleteFunc(table, id) {
        return this.connection.query(`DELETE FROM ?? WHERE id = ?`, [table, id]);
    }

    // Updates anything in any table by id #
    updateFunc(table, id, elem) {
        return this.connection.query(`UPDATE ?? SET ? WHERE id = ?`, [table, id, elem])
    }

}

// exporting constructor
module.exports = new Db(connection);