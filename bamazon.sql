
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(20,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    product_sales DECIMAL(20,2) NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO Products(ProductName, DepartmentName, Price, StockQuantity)
VALUES 
    ("Eggs", "grocery", 1.99, 12),
    ('Dove Conditioner', 'Cosmetics', 6.25, 627),
    ('Granny Smith Apples', 'Produce', 0.35, 800),
    ("Horizen Milk", "grocery", 6.99, 24),
    ("Sony Playstation 4", "electronics", 199.99, 5),
    ("Microsoft Xbox 1 ", "electronics", 179.99, 7),
    ("iPad", "electronics", 399.99, 18),
    ("Bicycle", "sporting goods", 599.99, 2),
    ("Football", "sporting goods", 9.99, 49),
    ("Harry Potter and Chamber of Secrets", "books", 9.99, 69),
    ("Game of Thrones", "books", 19.99, 33),
    ("Fight Club", "books", 11.99, 6),
    ("Fight Club", "dvds", 13.99, 36),  
    ("Office Space", "dvds", 9.99, 21),
    ("Dark Side of the Moon", "music", 11.55, 15);

CREATE TABLE Departments(
    DepartmentID INTEGER AUTO_INCREMENT PRIMARY KEY,
    DepartmentName VARCHAR(30),
    OverHeadCosts DOUBLE(10,2),
    TotalSales DOUBLE(10,2));

INSERT INTO Departments(DepartmentName, OverHeadCosts, TotalSales)
VALUES 
    ("grocery", 10500.00, -10000.00), -- More fun stuff (refunds for days!) ;)
    ("electronics", 25000.00, 0.00),
    ("sporting goods", 15000.00, 0.00),
    ("books", 5000.00, 0.00),
    ("dvds", 20000.00, 0.00),
    ("music", 7500.00, 0.00);