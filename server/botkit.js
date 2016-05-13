const Botkit = require('botkit');
const botkitModel = require('./models/botkitModel.js');
const logger = require('./logger.js');
const BOT_KEY = require('./config/botKey.js');

module.exports = () => {
  const controller = Botkit.slackbot({
    debug: true,
    logLevel: 4,
    //include "log: false" to disable logging
    //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
  });

  // connect the bot to a stream of messages
  controller.spawn({
    token: BOT_KEY,
  }).startRTM();

  // give the bot something to listen for.
  controller.on('ambient', (bot, message) => {
    logger.log('info', 'slack message - ', message.text);
    botkitModel.push(message.text);
  });
};
