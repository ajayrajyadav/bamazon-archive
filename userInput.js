var inquirer = require("inquirer");

function getStartMenuSelection() {
    return inquirer
      .prompt({
        name: "postOrBid",
        type: "list",
        message: "Welcome to Bamazon, what portal would you like to access?",
        choices: ["Customer", "Manager", "Executive", "Exit"]
      });
  }

function getWhatUserWantToBuy(){
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

module.exports = {
    getStartMenuSelection: getStartMenuSelection,
    getWhatUserWantToBuy: getWhatUserWantToBuy,
  };