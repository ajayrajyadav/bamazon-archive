const dbConnection = require('./dbConnection');

function selectAllRecords(queryParams, callback) {
    console.log(queryParams)
  dbConnection.query(queryParams, callback);
}

function addNewItem(itemData, callback) {
  console.log(itemData);
  dbConnection.query(
    'INSERT INTO auctions ' +
    '(item_name, category, starting_bid, highest_bid) ' +
    'values (?, ?, ?, ?)',
    [itemData.name, itemData.category, itemData.startingBid, 0],
    callback
    );
}

module.exports = {
  addNewItem: addNewItem,
  selectAllRecords: selectAllRecords
};
