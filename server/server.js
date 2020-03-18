const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { model } = require('./model');

const app = express();

const port = 3000;

app.use(morgan('dev'));

app.use(bodyParser({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../public/')));

app.get('/exampleHomeSummary/', (req, res) => {
  const { address } = req.query;
  console.log('The query address is:', address);
  model.getExampleAddressesData(address, (error, result) => {
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
