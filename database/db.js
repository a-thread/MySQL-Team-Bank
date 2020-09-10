const connection = require("./connection");

class Db {
    constructor() {
        this.connection = connection;
    }
    
    findAllEmp() {
        return this.connection.query("SELECT * FROM employee")
    }

    findAllDept() {
        return this.connection.query("SELECT * FROM department")
    }
}

module.exports = new Db(connection);