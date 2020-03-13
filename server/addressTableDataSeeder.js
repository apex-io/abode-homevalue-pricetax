const faker = require('faker');
const fs = require('fs');

const addresses = {
  address: [],
  on_market: [],
  sqft: [],
  bed: [],
  bath: [],
  addressesTableData: '',
};

for (let i = 0; i < 100; i += 1) {
  addresses.address.push(faker.fake('{{address.streetAddress}} {{address.streetName}}, {{address.city}}, {{address.state}}, {{address.zipCode}} '));
  addresses.on_market.push(faker.random.boolean());
  addresses.sqft.push(faker.random.number({ min: 200, max: 7000 }));
  addresses.bed.push(faker.random.number({ min: 0, max: 10 }));
  addresses.bath.push(faker.random.number({ min: 1, max: 10 }));
  addresses.addressesTableData += `"\\N"\t${addresses.address[i]}\t${addresses.on_market[i]}\t${addresses.sqft[i]}\t${addresses.bed[i]}\t${addresses.bath[i]}\t\n`;
}

fs.writeFile('addressTableData.txt', addresses.addressesTableData, 'utf8');

module.exports = { addresses };
