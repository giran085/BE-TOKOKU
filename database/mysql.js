const mysql = require('mysql')

const db = mysql.createConnection({
    host : "localhost",
    port : 3306,
    password : "bwacourse",
    database : "my_commerce",
    user : "root"
})

module.exports = db