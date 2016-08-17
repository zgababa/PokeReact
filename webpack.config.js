const path = require('path');
const webpack = require('webpack');

const APP_DIR = path.resolve(__dirname, 'src/app');

const config = {
  entry : [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    `${APP_DIR}/app.jsx`
  ],
  output : {
    path : path.join(__dirname, 'dist'),
    filename : 'bundle.js',
    publicPath : '/static/'
  },
  plugins : [
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
