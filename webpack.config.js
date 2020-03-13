const path = require('path');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundledIndex.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
