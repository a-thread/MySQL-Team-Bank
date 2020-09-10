var mysql = require("mysql");
var util = require("util");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employee_db"
});


// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected as ID Thread: " + connection.threadId)
  // run the start function after the connection is made to prompt the user
 
});

connection.query = util.promisify(connection.query);

module.exports = connection