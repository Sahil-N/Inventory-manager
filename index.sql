DROP DATABASE IF EXISTS marketplace;
CREATE DATABASE marketplace;
USE marketplace;


CREATE TABLE products(
  id INTEGER AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  item_sku VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  retail_price DECIMAL(10,2) NOT NULL,
  quantity INTEGER(100) NOT NULL,
  PRIMARY KEY (id) 
  );

INSERT INTO products (product_name, item_sku, department, retail_price, quantity)
VALUES ("Playstation 4", "123ps", "video games", 299.99, 10);

INSERT INTO products (product_name, item_sku, department, retail_price, quantity)
VALUES ("Xbox 1", "123xb", "video games", 229.99, 50);

INSERT INTO products (product_name, item_sku, department, retail_price, quantity)
VALUES ("Nintendo Switch", "123nt", "video games", 299.99, 6);

INSERT INTO products (product_name, item_sku, department, retail_price, quantity)
VALUES ("MPC X", "834mp", "musical instruments", 2199.00, 48);

INSERT INTO products (product_name, item_sku, department, retail_price, quantity)
VALUES ("Maschine Mk3", "834ks", "musical instruments", 599.00, 20);

INSERT INTO products (product_name, item_sku, department, retail_price, quantity)
VALUES ("M-Audio Axiom61", "834ps", "musical instruments", 200.99, 10);

INSERT INTO products (product_name, item_sku, department, retail_price, quantity)
VALUES ("iPhone 8+", "095xl", "cell phones", 899.99, 25);

INSERT INTO products (product_name, item_sku, department, retail_price, quantity)
VALUES ("Pixel XL", "095xs", "cell phones", 699.95, 50);

INSERT INTO products (product_name, item_sku, department, retail_price, quantity)
VALUES ("goPro", "206id", "cameras", 399.99, 35);

INSERT INTO products (product_name, item_sku, department, retail_price, quantity)
VALUES ("DJi Osmo", "206soi", "cameras", 1200.09, 5);

INSERT INTO products (product_name, item_sku, department, retail_price, quantity)
VALUES ("DJI ZenMuse", "206ios", "cameras", 2498.09, 25);