'use strict';

const appRootPath = require('app-root-path').path;
const path = require('path');


module.exports = (config) => {
  config.set({
    basePath : '',
    frameworks : ['browserify', 'mocha', 'chai', 'phantomjs-shim'],
    files : [
      path.join(appRootPath, 'app/**/*.spec.jsx')
    ],
    preprocessors : {
      [path.join(appRootPath, 'app/**/*.spec.jsx')] : ['browserify']
    },
    browserify : {
      debug : true,
      transform : ['babelify'],
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
    logLevel : 'error',
    autoWatch : true,
    browsers : ['PhantomJS'],
    singleRun : true
  });
};
