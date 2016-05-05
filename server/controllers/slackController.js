const chatbot = require('../chatterbot/chatbotController.js');
const AlchemyAPI = require('alchemy-api');
const logger = require('../logger.js');

module.exports = {
  postMessage: (req, res, next) => {
    AlchemyAPI.sentiment(req.body, {}, (err, results) => {
      if (err) { logger.log('error', 'post error - ', err); }
      // store results in db
    });
    chatbot.response(req.body, (err, msg) => {
      if (err) { logger.log('error', 'chatbot error - ', err); }
      res.send(msg);
    });
  },
};
