const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pondba13501",
  database: "it_foodhub",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected")
});

module.exports = db.promise();