const chatbot = require('./chatController.js');
let botkitModel = require('../models/botkitModel.js');
const logger = require('../logger.js');
const TRAIN_INTERVAL = 3.6e6;
// const chat = requre('./chat')
// Every ten minutes, the in-memory training store is sent
// to the chatbot for training then cleared.
// Refactor to use the db when we have many users
const resetStore = () => [];
const ID = 0;
// Currently only support a single bot, the ID will refer
// to the unique bot ID when we transition to many bots
module.exports = {
  botkitAutoTrain: () => {
    setInterval( () => {
      if (botkitModel.length > 2) {
        chatbot.train(ID, botkitModel);
        logger.log('info', 'training successful');
        botkitModel = resetStore();
      } else {
        logger.log('info', 'botkit model is too short, will not train');
      }
    }, TRAIN_INTERVAL);
  },
  respondAnalyzeAndStore: (message, callback) => {

    chatbot.messageReceived(message, (err, res) => {
      callback(err, res);
    })
  }
};
