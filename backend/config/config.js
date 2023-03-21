const mysql = require('mysql2')

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pondba13501',
    database: 'itfoodhub'
})
module.exports = pool.promise()


