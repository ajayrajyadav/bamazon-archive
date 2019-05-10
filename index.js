const database = require('./database');
const userInput = require('./userInput');
const bamazonCustomer = require("./bamazonCustomer");

database.connectToDB(start);

function start() {
    userInput
        .getStartMenuSelection()
        .then(callFunctionsORExit);
}

function callFunctionsORExit(answer) {
    if (answer.postOrBid === "Customer") {
        callBamazonCustomer();
        // start();
    } else if (answer.postOrBid === "Exit") {
        exit;
    }
}

function callBamazonCustomer() {
    bamazonCustomer.displayInventory();
}

function exit() {
    database.endConnection();
    process.exit();
}

module.exports = {
    start: start
  };