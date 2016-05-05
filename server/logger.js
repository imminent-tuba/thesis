const winston = require('winston');
const config = require('./config/winston.js');
require('winston-loggly');

config(winston);

module.exports = winston;

  // how to use winston levels

  // { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

  // const logger = require('../logger.js')

  // logger.log('silly', "some silly thing to log");
  // logger.silly("some silly thing to log");
