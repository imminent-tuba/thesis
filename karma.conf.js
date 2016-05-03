// Karma configuration
// Generated on Wed Apr 27 2016 16:41:03 GMT-0700 (PDT)
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    // basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
<<<<<<< 754ba3f712fad1502267668150a753617058fcad
      'client/*.html', 'test/**/*Spec.js',
=======
      'client/tests.webpack.js',
      'server/tests/*',
>>>>>>> update .gitignore with DS_Store
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'client/tests.webpack.js': ['webpack', 'sourcemap'],
      // preprocess with webpack and our sourcemap loader
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],

    specReporter: {
      maxLogLines: 5,
      // limit number of lines logged per test
      suppressErrorSummary: false,
      // do not print error summary
      suppressFailed: false,
      // do not print information about failed tests
      suppressPassed: false,
      // do not print information about passed tests
      suppressSkipped: true,
      // do not print information about skipped tests
      showSpecTiming: false,
      // print the time elapsed for each spec
    },

    // web server port
    // port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },
<<<<<<< 754ba3f712fad1502267668150a753617058fcad

=======
>>>>>>> update .gitignore with DS_Store

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    webpack: webpackConfig,
  });
};
