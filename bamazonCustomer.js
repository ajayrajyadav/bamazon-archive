
require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors/safe")
var table = require('cli-table');
const dbQueries = require('./dbQueries');
const userInput = require('./userInput');
const database = require('./database');

var l = console.log;
let items = [];

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA
});

// connection.connect();
database.connectToDB(main);
// main();

function main() {
    displayInventory();
    // purchase();
}

function displayInventory(callback) {
    database.getAllProdcts("SELECT item_id, product_name, price FROM Products", errorOrDisplay)
}
function errorOrDisplay(error, results) {
    if (error) {
        throw new Error('An error occurred while loading auction items');
    } else {
        printTable(results);
    }
}

function printTable(result) {
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
    l("\n")
    l(displayTable.toString());
    l("\n")
    purchase();
}

function purchase() {
    userInput
        .getWhatUserWantToBuy()
        .then(queryDatabaseForSingleItem)
}

function queryDatabaseForSingleItem(value) {
    let queryString = "SELECT * FROM products WHERE item_id=" + value.item_id
    database.getAllProdcts(queryString, function (error, results) {
        if (error) {
            throw new Error('An error occurred while searching for that item');
        } else {
            updateStock(results, value);
        }
    })
}

function updateStock(result, value) {
    if (result[0].stock_quantity < value.quantity) {
        l("That product is out of stock, please pick again. \n")
        main();
    } else if (result[0].stock_quantity >= value.quantity) {
        l(value.quantity + " items purchased of " + result[0].product_name + " at $" + result[0].price)
        var saleTotal = result[0].price * value.quantity;
        l("Your Total is $" + saleTotal)
        let newQty = result[0].stock_quantity - value.quantity;
        updateStockInDatabase(newQty, value);
    }

}

function updateStockInDatabase(newQty, value) {
    let queryString = "UPDATE products SET stock_quantity= "+ newQty +" WHERE item_id= "+ value.item_id;
    database.getAllProdcts(queryString, function (error, results) {
        if (error) {
            throw new Error();
        } else {
            main();
        }
    })
}