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
  startDbPoll: socket => {
    setInterval(() => {
      // remove first arg after migration to keywords in analysisCtrl
      analysis.getAnalysis(null, (err, res) => {
        // rename socket channel from emotions to something more general
        socket.emit('emotions', res);
      });
    }, 1000);
  },
};
