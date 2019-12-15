DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(140) NOT NULL,
    department_name VARCHAR(140) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(100) NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES
("Digital Alarm Clock", "Electronics", 20, 50),
("Wireless Charging Dock", "Cell Phones & Accessories", 40, 50),
("Oculus Rift", "Entertainment", 700, 100),
("Electric Blanket", "Electronics", 50, 80),
("Wool Jacket", "Outdoors", 140, 25),
("PowerBlock Dumbbells", "Fitness", 550, 35),
("Playstation 4", "Entertainment", 400, 90),
("Protein Powder", "Fitness", 32, 40),
("Google Nes Hub", "Home", 80, 25),
("Dog/Cat Water Station", "Pets", 50, 70);

SELECT * FROM products;