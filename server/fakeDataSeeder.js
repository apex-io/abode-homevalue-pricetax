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

const valueHistory = {
  address: [],
  date: [],
  homeValue: [],
  areaValue: [],
  cityValue: [],
  centralValue: [],
  estimatedValueHistoryTableData: '',
};

for (let i = 0; i < 100; i += 1) {
  addresses.address.push(faker.fake('{{address.streetAddress}} {{address.streetName}}, {{address.city}}, {{address.state}}, {{address.zipCode}} '));
  addresses.on_market.push(faker.random.boolean());
  addresses.sqft.push(faker.random.number({ min: 200, max: 7000 }));
  addresses.bed.push(faker.random.number({ min: 0, max: 10 }));
  addresses.bath.push(faker.random.number({ min: 1, max: 10 }));
  addresses.addressesTableData += `"\\N"\t${addresses.address[i]}\t${addresses.on_market[i]}\t${addresses.sqft[i]}\t${addresses.bed[i]}\t${addresses.bath[i]}\t\n`;
  valueHistory.address.push(addresses.address[i]);
  valueHistory.date.push([]);
  valueHistory.homeValue.push([]);
  valueHistory.areaValue.push([]);
  valueHistory.cityValue.push([]);
  if (i === 0) {
    valueHistory.centralValue.push(200000);
  } else {
    valueHistory.centralValue.push(valueHistory.centralValue[i - 1] * (102 / 100));
  }
  for (let j = 0; j < 100; j += 1) {
    const date = faker.date.between('1/1/2010', '1/1/2020');
    const convertedDate = `${(new Date(date)).getFullYear()}-${(new Date(date)).getMonth() + 1}-${(new Date(date)).getDate()}`;
    valueHistory.date[i].push(convertedDate);
    if (j === 0) {
      valueHistory.homeValue[i].push(faker.random.number({
        min: valueHistory.centralValue[i] * (98 / 100),
        max: valueHistory.centralValue[i] * (102 / 100),
      }));
    } else {
      valueHistory.homeValue[i].push(faker.random.number({
        min: valueHistory.homeValue[i][j - 1] * (98 / 100),
        max: valueHistory.homeValue[i][j - 1] * (102 / 100),
      }));
    }
    valueHistory.areaValue[i].push(faker.random.number({
      min: valueHistory.homeValue[i][j] * (96 / 100),
      max: valueHistory.homeValue[i][j] * (104 / 100),
    }));
    valueHistory.cityValue[i].push(faker.random.number({
      min: valueHistory.homeValue[i][j] * (94 / 100),
      max: valueHistory.homeValue[i][j] * (106 / 100),
    }));
  }
}
for (let i = 0; i < 100; i += 1) {
  valueHistory.date[i].sort(-1);
  for (let j = 0; j < 100; j += 1) {
    valueHistory.estimatedValueHistoryTableData += `"\\N"\t${valueHistory.address[i]}\t${valueHistory.date[i][j]}\t${valueHistory.homeValue[j][i]}\t${valueHistory.areaValue[j][i]}\t${valueHistory.cityValue[j][i]}\t\n`;
  }
}

fs.writeFile('addressTableData.txt', addresses.addressesTableData, 'utf8');
fs.writeFile('estimatedValueHistoryTableData.txt', valueHistory.estimatedValueHistoryTableData, 'utf8');
