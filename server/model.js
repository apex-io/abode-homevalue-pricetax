const fs = require('fs');
const { addresses } = require('./addressTableDataSeeder');

const model = {};

model.addressesTableData = '';

for (let i = 0; i < 100; i += 1) {
  model.addressesTableData += `"\\N"\t${addresses.address[i]}\t${addresses.on_market[i]}\t${addresses.sqft[i]}\t${addresses.bed[i]}\t${addresses.bath[i]}\t\n`;
}

model.seedAddresses = (data) => {
  fs.writeFile('addressTableData.txt', data, 'utf8');
  return '';
};


module.exports = {
  model,
};
