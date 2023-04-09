const mysql = require('mysql2')

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pondba13501',
    database: 'itfoodhub',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})
module.exports = pool.promise()


