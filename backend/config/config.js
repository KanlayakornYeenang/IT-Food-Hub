const mysql = require('mysql2')

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abc484107123',
    database: 'itfoodhub'
})
module.exports = pool.promise()


