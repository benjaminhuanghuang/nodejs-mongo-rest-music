const path = require('path');
module.exports = {
  entry: [
    './src/index.js',
    'babel-polyfill',
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['client', 'node_modules'],
  },
  devServer: {
    contentBase: './'
  }
};