const faker = require('faker');

const addresses = {};

addresses.address = [];

for (let i = 0; i < 100; i += 1) {
  addresses.address.push(faker.fake('{{address.streetAddress}} {{address.streetName}}, {{address.city}}, {{address.state}}, {{address.zipCode}} '));
}

addresses.on_market = [];

for (let i = 0; i < 100; i += 1) {
  addresses.on_market.push(faker.random.boolean());
}

addresses.sqft = [];

for (let i = 0; i < 100; i += 1) {
  addresses.sqft.push(faker.random.number({ min: 200, max: 7000 }));
}

addresses.bed = [];

for (let i = 0; i < 100; i += 1) {
  addresses.bed.push(faker.random.number({ min: 0, max: 10 }));
}

addresses.bath = [];

for (let i = 0; i < 100; i += 1) {
  addresses.bath.push(faker.random.number({ min: 1, max: 10 }));
}

module.exports = { addresses };
