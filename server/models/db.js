const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
<<<<<<< HEAD
  password: "abc484107123",
  database: "foodhub",
=======
  password: "pondba13501",
  database: "it_foodhub",
>>>>>>> 5e5ac7a814ae58ad68ad4c04ce6fc6cb7d949ff3
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected");
});

module.exports = db.promise();