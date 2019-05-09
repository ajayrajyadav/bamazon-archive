require("dotenv").config();
var mysql = require("mysql");
const mysqlConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA
}

const connection = mysql.createConnection(mysqlConfig);

function endConnection(){
    connection.end();
}

function connectToDB(continuation){
    connection.connect(function (err){
        if(err) throw err;
        continuation();
    });
}