const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { getAllAddressesData } = require('./model');

const app = express();

const port = 3000;

app.use(morgan('dev'));

app.use(bodyParser({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../public/')));

app.get('/getAllAddressesData', (req, res) => {
  getAllAddressesData((error, result) => {
    res.send(result);
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
