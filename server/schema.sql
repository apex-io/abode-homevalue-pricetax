DROP DATABASE IF EXISTS homevalue_pricetax;

CREATE DATABASE homevalue_pricetax;

USE homevalue_pricetax;

CREATE TABLE addresses (
  id INT(10) AUTO_INCREMENT,
  address VARCHAR(100),
  on_market VARCHAR(5),
  sqft INT(4),
  bed INT(2),
  bath INT(2),
  PRIMARY KEY (id)
);

CREATE TABLE estimated_value_history (
  id INT(10) AUTO_INCREMENT,
  address_id INT(10),
  date DATE,
  estimated_home_value INT(15),
  estimated_area_value INT(15),
  estimated_city_value INT(15),
  PRIMARY KEY (id)
);

CREATE TABLE price_history (
  id INT(10) AUTO_INCREMENT,
  address_id INT(10),
  event VARCHAR(25),
  price INT(15),
  source VARCHAR(25),
  PRIMARY KEY (id)
);

CREATE TABLE tax_history (
  id INT(10) AUTO_INCREMENT,
  address_id INT(10),
  property_tax INT(15),
  tax_assessment INT(15),
  PRIMARY KEY (id)
);
