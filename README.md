# Abode
- Module: Home Value
- Usage: This module shows the estimation of the home value along with the display of relavant houses
- Instruction: follow the instructions in the Table of Contents in sequential order.


# Table of Contents
- Development requirements
- Environment set up
- Data creation and seeding
- Build the bundle file
- Server set up
- Accessing the service

## Requirements
- Node 8.17.0

## Environment set up
Run this command in the CLI (in this module's root directorate):
```sh
npm install
```

## Data creation and seeding
NOTE: you might have to change the option in the `db.js` file (inside the server folder) to have the correct log in to your mysql server

1. To clear data && set schema, make sure your mysql server is running, then run this command in your CLI (in this module's root directorate):
```sh
mysql -u root < server/schema.sql
```

2. To seed your data, run this command in your CLI (in this module's root directorate) and 2 txt files (`addressTableData.txt` and `estimatedValueHistoryTableData.txt`) will be created in your root directorate:
```sh
node server/fakeDataSeeder.js
```

3. Create a new folder, called fakeData in this module's root directorate

4. Move your txt files from the root directorate into the `fakeData` folder

5. To load data for `addresses` table in mysql, run these commands in your mysql server (in this module's root directorate):
```sh
USE homevalue_pricetax;
```
```sh
LOAD DATA LOCAL INFILE './fakeData/addressTableData.txt' INTO TABLE addresses;
```

6. To load data for `estimated_value_history` table in mysql, run these commands in your mysql server (in this module's root directorate):
```sh
USE homevalue_pricetax;
```
```sh
LOAD DATA LOCAL INFILE './fakeData/estimatedValueHistoryTableData.txt' INTO TABLE estimated_value_history;
```

## Build the bundle file
Run this command in the CLI (in this module's root directorate):
```sh
npm run build
```

## Server set up
NOTE: This server will run on port `3333` of your local host

Run this command in the CLI (in this module's root directorate):
```sh
npm start
```

## Accessing the service
Go to your browser (preferrably Google Chrome) and type in:
```sh
http://localhost:3333
```