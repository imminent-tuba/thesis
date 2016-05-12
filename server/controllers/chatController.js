// interface with chatterbot, server socket, botkit, alchemy controller

const analysis = require('../controllers/analysisController.js');
const chatterbot = require('../chatterbot/chatbotController.js');
const logger = require('../logger.js');

const ID = 0; // this will be replaced with Bot ID

module.exports = {
  messageReceived: (message, callback) => {
    chatterbot.response(ID, message, callback);
    analysis.alchemyAnalyze(message, (err, res) => {
      analysis.saveAnalysis(res, (/* wat do */) => {
        logger.log('debug', 'Message analysis saved', message);
        callback();
      });
    });
  },
  callDb: (ioServer, wasUpdated) => {
    if (wasUpdated) {
      analysis.getAnalysis(null, (err, res) => {
        ioServer.emit('populateGraph', res);
      });
    }
    return false;
  },
};
