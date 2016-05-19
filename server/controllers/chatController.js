// interface with chatterbot, server socket, botkit, alchemy controller

const analysis = require('../controllers/analysisController.js');
const chatterbot = require('../chatterbot/chatbotController.js');
const logger = require('../logger.js');

const ID = 0; // this will be replaced with Bot ID

module.exports = {
  messageReceived: (message, callback) => {
    message = message.replace(/[^\x00-\x7F]/g, '');
    chatterbot.response(ID, message, callback);
    analysis.alchemyAnalyze(message, (err, res) => {
      analysis.saveAnalysis(res, () => {
        logger.log('debug', 'Message analysis saved', message);
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
