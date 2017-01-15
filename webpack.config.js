'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const APP_DIR = path.resolve('app');
const DIST_PATH = path.resolve('dist');

const config = {
  entry : `${APP_DIR}/app.jsx`,
  output : {
    path : DIST_PATH,
    filename : 'bundle.js'
  },
  devtool : 'source-map',
  plugins : [
    new CleanWebpackPlugin([DIST_PATH], { root : __dirname }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{ from : `${APP_DIR}/index.html`, to : DIST_PATH }]),
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
