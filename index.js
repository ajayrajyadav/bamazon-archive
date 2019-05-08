const dbQueries = require('./dbQueries');
const mainMenu = require('./mainMenu');
const addItem = require('./addItem');


function selectAllRecords(callback) {
  dbQueries.selectAllRecords(function(error, data) {
    console.log(data);

    callback(error, data);
  });
}

function showCustomerModule(callback) {
  customerModule.displayNewItemMenu(callback);
}

function exit(callback) {
  callback(null, null);
  process.exit();
}

const menuOptions = {
  'Customer': customerModule,
  'Manager': selectAllRecords,
  'Executive': hand-coded,
  'Exit': exit
};

function showMainMenu(error) {
  if(error) {
    console.log(error);
  } else {
    mainMenu.showMainMenu(menuOptions, showMainMenu);
  }
}

showMainMenu();