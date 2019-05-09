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
function insertNewProduct(tableName, product, continuation){
    return connection.query(
        "INSERT INTO" + tableName + "SET ?",
        {
            product_name: product.name,
            department_name: product.department,
            price: product.price,
            stock_quantity: product.qty
        },
        continuation
    );
}

function getAllProdcts(query, continuation){
    
    connection.query(query, function(err,results){
        if(err) throw err;
        continuation(err,results);
    })
}

module.exports = {
    connectToDB: connectToDB,
    endConnection: endConnection,
    insertNewProduct: insertNewProduct,
    // insertNewAuctionItem: insertNewAuctionItem,
    // updateItemBid: updateItemBid
    getAllProdcts: getAllProdcts
  };