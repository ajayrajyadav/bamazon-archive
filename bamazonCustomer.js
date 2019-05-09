
require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors/safe")
var table = require('cli-table');
const dbQueries = require('./dbQueries');

var l = console.log;
let items = [];

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA
});

main();

function main(){
    displayInventory();
    purchase();
}

function displayInventory(callback){
    connection.connect();

    // dbQueries.selectAllRecords(function(error, data){
    //     printTable(data);
    //     callback(error, data)
    // })

    connection.query("SELECT item_id, product_name, price FROM Products", function(err, result){
        if(err){
            l(err);
        }
        items = result;
       printTable(result);
    });
    connection.end();
}

function printTable(result){
    var displayTable = new table({
        head: ["Item ID#", "Product Name", "Price"],
        style: {
            head: ["blue"],
            compact: false,
            colAligns: ["center"],
        }
    });

    for (let i = 0; i < result.length; i++) {
        displayTable.push(
            [result[i].item_id, result[i].product_name, result[i].price]
        )
    }
    l(displayTable.toString());
    l("\n")
}

function purchase(){
    getNewItem()
    .then(updateQty)
}

function getNewItem() {
    return inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase.',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?',
			validate: validateInput,
			filter: Number
		}
	]);
  }

function validateInput(value){
    var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return "Please enter a whole non-zero number.";
	}
}

function updateQty(value){
    l(value.item_id)
    
}