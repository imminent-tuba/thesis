var webpack = require('webpack');
var webpackConfig = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        // regular expression for .jsx or .js
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
        include: /flexboxgrid/,
      },
    ],
  },
};

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],
    singleRun: true,
    frameworks: [ 'mocha', 'chai', 'sinon', 'sinon-chai' ],
    files: [
<<<<<<< 8977d430bff627a6d8d387575eda28b2b7b23db1
      'client/tests.webpack.js',
      'server/tests/*',
=======
      // 'client/*.html',
      'test/**/*Spec.js',
      'server/controllers/analyzerController.js',
>>>>>>> fix AVG Emotion and Sockets
    ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter',
      'karma-sinon',
      'karma-sinon-chai',
    ],
    preprocessors: {
      'client/tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha' ],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
    },
    colors: true,
    autoWatch: true,
<<<<<<< 672f45d90bcb345316715e5560fc34c1b6103558
=======

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },
<<<<<<< 8977d430bff627a6d8d387575eda28b2b7b23db1
=======

>>>>>>> fix AVG Emotion and Sockets

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
<<<<<<< 8977d430bff627a6d8d387575eda28b2b7b23db1
    webpack: webpackConfig,
=======

    // webpack: webpackConfig
>>>>>>> fix AVG Emotion and Sockets
>>>>>>> fix AVG Emotion and Sockets
  });
};
