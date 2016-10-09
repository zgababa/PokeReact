'use strict';

const path = require('path');
const webpack = require('webpack');

const APP_DIR = path.resolve(__dirname, 'app');


module.exports = {
  devtool : 'eval',
  entry : `${APP_DIR}/app.jsx`,
  output : {
    path : path.join(__dirname, 'dist'),
    filename : 'bundle.js',
    publicPath : '/static/'
  },
  plugins : [
    new webpack.DefinePlugin({
      'process.env' : {
        NODE_ENV : JSON.stringify('production')
      }
    })
  ],
  module : {
    loaders : [{
      test : /\.jsx?/,
      loaders : ['babel'],
      include : APP_DIR
    }]
  }
};
