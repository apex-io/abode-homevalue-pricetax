Product: Abode

Module: Home Value:
This module is used to replicate Zillow's Home Value feature.

Table of Contents
Requirements
Environment set up
Data creation
Server set up
Accessing the client side

Requirements
Node 6.13.0
etc


Environment set up:
Run this command in the CLI (in this module's root directorate):
npm install


Data creation:
To clear data && set schema, run this command in your CLI (in this module's root directorate):
mysql -u root < server/schema.sql

To seed your data, run this command in your CLI (in this module's root directorate):
node server/fakeDataSeeder.js

Move your seeded data (addressTableData.txt and estimatedValueHistoryTableData.txt) into a folder (name the folder fakeData)

To load data for addresses table in mysql, run these commands in your mysql server (in this module's root directorate):
USE homevalue_pricetax;
LOAD DATA LOCAL INFILE './fakeData/addressTableData.txt' INTO TABLE addresses;

To load data for estimated_value_history table in mysql, run these commands in your mysql server (in this module's root directorate):
USE homevalue_pricetax;
LOAD DATA LOCAL INFILE './fakeData/estimatedValueHistoryTableData.txt' INTO TABLE estimated_value_history;


Server set up:
This server will run on port 3333 of your local host
Run this command in the CLI (in this module's root directorate):
npm start

Accessing the client side:
Go to your browser (preferrably Google Chrome) and type in http://localhost:3333