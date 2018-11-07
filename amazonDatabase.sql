CREATE DATABASE shoeStore_db; 

USE shoeStore_db; 

CREATE TABLE shoes (
    item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    product_name VARCHAR(50) NOT NULL, 
    department_name VARCHAR(20) NOT NULL, 
    price FLOAT NOT NULL, 
    stock_quantity INT NULL
);

INSERT INTO shoes (product_name, department_name, price, stock_quantity) VALUE ("Jordans", "Basketball", 200, 5);
INSERT INTO shoes (product_name, department_name, price, stock_quantity) VALUE ("Kobes", "Basketball", 160, 10);
INSERT INTO shoes (product_name, department_name, price, stock_quantity) VALUE ("Lebrons", "Basketball", 175, 10);
INSERT INTO shoes (product_name, department_name, price, stock_quantity) VALUE ("Shaqs", "Basketball", 40, 50);
INSERT INTO shoes (product_name, department_name, price, stock_quantity) VALUE ("Iversons", "Basketball", 150, 10);
INSERT INTO shoes (product_name, department_name, price, stock_quantity) VALUE ("T-Macs", "Basketball", 150, 10);
INSERT INTO shoes (product_name, department_name, price, stock_quantity) VALUE ("Durants", "Basketball", 155, 8 );
INSERT INTO shoes (product_name, department_name, price, stock_quantity) VALUE ("Carmelos", "Basketball", 95, 13);
INSERT INTO shoes (product_name, department_name, price, stock_quantity) VALUE ("Barkleys", "Basketball", 220, 3);
INSERT INTO shoes (product_name, department_name, price, stock_quantity) VALUE ("Pippens", "Basketball", 199, 6);


CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    department_name VARCHAR(20) NOT NULL, 
    over_head_costs FLOAT NOT NULL, 
);

ALTER TABLE shoes 
ADD COLUMN sales INT(20) NOT NULL 

ALTER TABLE departments
ADD COLUMN product_sales INT(30) NOT NULL 
ADD COLUMN total_profit INT(30) NOT NULL 
