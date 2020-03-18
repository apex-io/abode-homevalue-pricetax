const { db } = require('./db');

const model = {};

model.getExampleAddressesData = (address, callback) => {
  const queryString = 'SELECT * FROM addresses WHERE address = ?';
  const addressToSearch = [address];
  db.query(queryString, addressToSearch, (errorFromAddressesQuery, address) => {
    if (errorFromAddressesQuery) {
      console.log('There has been an error querying the database. The error is:', errorFromAddressesQuery);
      callback(errorFromAddressesQuery, null);
    } else {
      console.log('The result from address query is:', address);
      const queryString = 'SELECT * FROM estimated_value_history WHERE address = ?';
      db.query(queryString, addressToSearch, (errorFromHomeValueQuery, homeValue) => {
        if (errorFromHomeValueQuery) {
          console.log('There has been an error querying the addresses from the database. The error is:', errorFromHomeValueQuery);
          callback(errorFromHomeValueQuery, null);
        } else {
          // const result = { address, homeValue };
          const returnData = {
            addressSummary: address[0],
            addressValues: homeValue,
          };
          callback(null, returnData);
        }
      });
    }
  });
};

module.exports = {
  model,
};
