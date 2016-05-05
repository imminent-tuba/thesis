const winston = require('winston');
require('winston-loggly');

winston.level = 'info';
winston.add(winston.transports.Loggly, {
  token: 'f0c21076-0bdf-4274-ace0-5f95eaba77ae',
  subdomain: 'joshwentworth',
  tags: ['Winston-NodeJS'],
  json: true,
});
winston.add(winston.transports.File, { filename: 'somefile.log' });

module.exports = winston;

  // how to use winston levels

  // { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

  // const logger = require('../logger.js')

  // logger.log('silly', "some silly thing to log");
  // logger.silly("some silly thing to log");
