const connection = require("../config/connection");

class Db {
    constructor() {
        this.connection = connection;
    }

    findAll() {
        return this.connection.query(`SELECT employee.id AS ID, CONCAT( employee.first_name, " ", employee.last_name ) AS Employee, title AS Title, salary AS Salary, dept_name AS Department, CONCAT( m.first_name, " ", m.last_name ) AS Manager
        FROM employee
        LEFT JOIN roles ON employee.role_id = roles.id
        LEFT JOIN department ON roles.dept_id = department.id
        LEFT JOIN employee m ON m.id = employee.manager_id`)
    }

    findDept() {
        return this.connection.query(`SELECT id AS ID, dept_name AS Department FROM department`)
    }

    getRoles() {
        return this.connection.query(`SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, department.dept_name AS "Department"
        FROM roles
        LEFT JOIN department ON roles.dept_id = department.id`)
    }

    getEmp() {
        return this.connection.query(`SELECT employee.id, employee.first_name, employee.last_name FROM employee`)
    }

    addEmp(res) {
        if (res.mangId === -1) {
            return this.connection.query('INSERT INTO employee SET ?', { first_name: res.firstName, last_name: res.lastName, role_id: res.roleId });
        } else {
            return this.connection.query('INSERT INTO employee SET ?', { first_name: res.firstName, last_name: res.lastName, role_id: res.roleId, manager_id: res.mangId });
        }
    }

    addDept(res) {
        return this.connection.query('INSERT INTO department SET ?', { dept_name: res.name });
    }

    addRole(res) {
        return this.connection.query('INSERT INTO roles SET ?', { title: res.name, salary: res.salary });
    }

    deleteFunc(table, id) {
        return this.connection.query(`DELETE FROM ?? WHERE id = ?`, [ table, id ]);
    }
}

module.exports = new Db(connection);