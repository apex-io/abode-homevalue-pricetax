const mysql = require('mysql');

const db = mysql.createConnection({
  user: 'root',
  database: 'homevalue_pricetax',
});

db.connect((error) => {
  if (error) {
    console.log('There has been an error. Error message:', error);
  } else {
    console.log('Connection established with id:', db.threadId);
  }
});

module.exports = { db };
