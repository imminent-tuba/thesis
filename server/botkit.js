const Botkit = require('botkit');

module.exports = () => {
  const controller = Botkit.slackbot({
    debug: true,
    logLevel: 4,
    //include "log: false" to disable logging
    //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
  });

  // connect the bot to a stream of messages
  controller.spawn({
    token: 'xoxb-41474260885-wLxyiIapDFEakA8GRS9UIyPr',
  }).startRTM();

  // give the bot something to listen for.
  controller.on('ambient', (bot, message) => {
    console.log('message', message.text);
    bot.reply(message, 'HeY!.');
  });
};
