const connection = require("../config/config");

class Db {
    constructor() {
        this.connection = connection;
    }
    
    findAll() {
        return this.connection.query("SELECT * FROM employee INNER JOIN department ON (employee.role_id = department.id) LEFT JOIN role ON (employee.manager_id = role.id)")
    }

    findDept() {
        return this.connection.query("SELECT * FROM department")
    }
    
    findMang() {
        return this.connection.query("SELECT * FROM department")
    }
}

module.exports = new Db(connection);