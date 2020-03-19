const { db } = require('./db');

const model = {};

model.getExampleAddressesData = (query, callback) => {
  const queryString = 'SELECT * FROM addresses WHERE address = ?';
  const addressToSearch = [query.address];
  const zipCodeToSearch = [query.zipCode, query.zipCode];
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
          const queryString = 'SELECT * FROM addresses WHERE zipcode < (? + 500) && zipcode > (? - 500)';
          db.query(queryString, zipCodeToSearch, (errorFromZipCodeQuery, addresses) => {
            const returnData = {
              addressSummary: address[0],
              addressValues: homeValue,
              similarAddresses: addresses,
            };
            callback(null, returnData);
          });
        }
      });
    }
  });
};

module.exports = {
  model,
};
