'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const APP_DIR = path.resolve(__dirname, 'app');

const config = {
  entry : `${APP_DIR}/app.jsx`,
  output : {
    path : path.join(__dirname, 'dist'),
    filename : 'bundle.js'
  },
  devtool : 'source-map',
  plugins : [
    new CleanWebpackPlugin(['dist'], { root : __dirname }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        loaders : ['react-hot', 'babel'],
        include : APP_DIR
      }
    ]
  }
};

module.exports = config;
