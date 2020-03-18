const { db } = require('./db');

const getAllAddressesData = (callback) => {
  const queryString = 'SELECT * FROM addresses';
  db.query(queryString, (error, result) => {
    if (error) {
      console.log('There has been an error querying the database. The error is:', error);
      callback(error, null);
    } else {
      console.log('The result from query is:', result);
      callback(null, result);
    }
  });
};

module.exports = {
  getAllAddressesData,
};
