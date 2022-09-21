const mysql = require("mysql");
const db = mysql.createConnection({
  host: "192.168.242.236",
  user: "root",
  password: "0411",
  database: "mydb",
});

db.connect();

module.exports = db;