'use strict';

const babelify = require('babelify'); // eslint-disable-line no-unused-vars
const appRootPath = require('app-root-path').path;
const path = require('path');

const distPath = path.join(appRootPath, '/dist');


module.exports = (config) => {
  config.set({
    basePath : '',
    frameworks : ['browserify', 'mocha', 'chai'],
    files : [
      path.join(appRootPath, 'src/**/*.spec.js')
    ],
    preprocessors : {
      './src/**/*.spec.js' : ['browserify']
    },
    browserify : {
      debug : true,
      transform : ['babelify'],
      paths : [
        distPath
      ],
      extensions : ['.js', '.jsx'],
      configure : (bundle) => {
        bundle.on('prebundle', () => {
          console.info('Browserify in progress...'); // eslint-disable-line no-console
          bundle.external('react/addons');
          bundle.external('react/lib/ReactContext');
          bundle.external('react/lib/ExecutionEnvironment');
        });
      }
    },
    reporters : ['nyan'],
    port : 9876,
    colors : true,
    logLevel : config.LOG_INFO,
    autoWatch : true,
    browsers : ['PhantomJS'],
    singleRun : true
  });
};
