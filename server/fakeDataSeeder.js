const faker = require('faker');
const fs = require('fs');
const pictureURL = 'https://abodeproject.s3.us-east-2.amazonaws.com/address';

const addresses = {
  address: [],
  zipCode: [],
  on_market: [],
  sqft: [],
  bed: [],
  bath: [],
  addressesTableData: '',
  listingValue: [],
  picture: [],
};

const valueHistory = {
  address: [],
  date: [],
  homeValue: [],
  centralValue: [],
  estimatedValueHistoryTableData: '',
};

const numberOfHouses = 1000;
const numberOfValuesPerHouse = 1000;

for (let i = 0; i < numberOfHouses; i += 1) {
  const streetAddress = faker.address.streetAddress();
  const streetName = faker.address.streetName();
  const city = faker.address.city();
  const state = faker.address.state();
  const zipCode = faker.address.zipCode();
  addresses.address.push(`${streetAddress} ${streetName}, ${city}, ${state}, ${zipCode}`);
  addresses.zipCode.push(zipCode.slice(0, 5));
  addresses.on_market.push(faker.random.boolean());
  addresses.sqft.push(faker.random.number({ min: 200, max: 7000 }));
  addresses.bed.push(faker.random.number({ min: 0, max: 10 }));
  addresses.bath.push(faker.random.number({ min: 1, max: 10 }));
  addresses.picture.push(`${pictureURL}${i + 1}.jpg`);
  valueHistory.address.push(addresses.address[i]);
  valueHistory.date.push([]);
  valueHistory.homeValue.push([]);
  if (i === 0) {
    valueHistory.centralValue.push(200000);
  } else if (i % 10 === 0) {
    valueHistory.centralValue.push(valueHistory.centralValue[i - 1] * (102 / 100));
  } else {
    valueHistory.centralValue.push(valueHistory.centralValue[i - 1]);
  }
  for (let j = 0; j < numberOfValuesPerHouse; j += 1) {
    const date = faker.date.between('1/1/2010', '1/1/2020');
    const convertedDate = `${(new Date(date)).getFullYear()}-${(new Date(date)).getMonth() + 1}-${(new Date(date)).getDate()}`;
    valueHistory.date[i].push(convertedDate);
    if (j === 0) {
      valueHistory.homeValue[i].push(faker.random.number({
        min: valueHistory.centralValue[i] * (98 / 100),
        max: valueHistory.centralValue[i] * (102 / 100),
      }));
    } else if (j % 10 === 0) {
      valueHistory.homeValue[i].push(faker.random.number({
        min: valueHistory.homeValue[i][j - 1] * (98 / 100),
        max: valueHistory.homeValue[i][j - 1] * (102 / 100),
      }));
    } else {
      valueHistory.homeValue[i].push(faker.random.number({
        min: valueHistory.homeValue[i][j - 1] * (99.98 / 100),
        max: valueHistory.homeValue[i][j - 1] * (100.02 / 100),
      }));
    }
  }
}
for (let i = 0; i < numberOfHouses; i += 1) {
  valueHistory.date[i].sort(-1);
  addresses.listingValue.push(valueHistory.homeValue[numberOfValuesPerHouse - 1][i]);
  addresses.addressesTableData += `"\\N"\t${addresses.address[i]}\t${addresses.zipCode[i]}\t${addresses.on_market[i]}\t${addresses.sqft[i]}\t${addresses.bed[i]}\t${addresses.bath[i]}\t${addresses.listingValue[i]}\t${addresses.picture[i]}\n`;
  for (let j = 0; j < numberOfValuesPerHouse; j += 1) {
    valueHistory.estimatedValueHistoryTableData += `"\\N"\t${valueHistory.address[i]}\t${valueHistory.date[i][j]}\t${valueHistory.homeValue[j][i]}\t\n`;
  }
}

fs.writeFile('addressTableData.txt', addresses.addressesTableData, 'utf8');
fs.writeFile('estimatedValueHistoryTableData.txt', valueHistory.estimatedValueHistoryTableData, 'utf8');
