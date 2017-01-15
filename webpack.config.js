'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const APP_DIR = path.resolve(__dirname, 'app');
const distPath = path.join(__dirname, 'dist');

const config = {
  entry : `${APP_DIR}/app.jsx`,
  output : {
    path : distPath,
    filename : 'bundle.js'
  },
  devtool : 'source-map',
  plugins : [
    new CleanWebpackPlugin(['dist'], { root : __dirname }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{ from : `${APP_DIR}/index.html`, to : distPath }]),
    new webpack.DefinePlugin({
      'process.env' : {
        NODE_ENV : JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
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
