var mysql = require("mysql");
var util = require("util");

// create the connection information
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",

  // database
  database: "employee_db"
});


// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected as ID Thread: " + connection.threadId)
 
});

connection.query = util.promisify(connection.query);

module.exports = connection;