
require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require('cli-table');

var l = console.log;

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA
});

main();

function main(){
    displayProductDatabase();
}

function displayProductDatabase(){
    connection.connect();
    connection.query("SELECT ItemID, ProductName, Price FROM Products", function(err, result){
        if(err){
            l(err);
        }
        var displayTable = new table({
            head: ["Item ID#", "Product Name", "Price"],
            style: {
                head: ["blue"],
                compact: false,
                colAligns: ["center"],
            }
        });

        for (let i = 0; i < result.length; i++) {
            displayTable.push([
                result[i].item_id, result[i].product_name, result[i].price
            ])
        }
        l(table.toString());
    });
}