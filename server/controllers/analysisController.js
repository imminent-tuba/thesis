const alchemy = require('./alchemyController.js');
const db = require('../models/databaseModel.js');
const logger = require('../logger.js');

module.exports = {
  alchemyAnalyze: (message, callback) => {
    const response = { message };
    alchemy.getEmotions(message, (err, emotions) => {
      response.emotions = emotions;
      alchemy.getTaxonomy(message, (err, taxonomy) => {
        response.taxonomy = taxonomy;
        alchemy.getKeywords(message, (err, keywords) => {
          response.keywords = keywords;
          callback(null, response);
        });
      });
    });
  },
  saveAnalysis: (analysis, callback) => {
    db.saveMessage(analysis.message, (err, res) => {
      logger.log('debug', 'Message saved', res);
      db.saveEmotions(analysis.emotions, (err, res) => {
        logger.log('debug', 'Emotions saved', res);
        db.saveTaxonomy(analysis.taxonomy, (err, res) => {
          logger.log('debug', 'Taxonomy saved', res);
          callback(null, analysis);
        });
      });
    });
  },
  getAnalysis: (data, callback) => {
    const response = {};
    db.getEmotions((err, emotions) => {
      response.emotions = emotions;
      db.getTaxonomy((err, taxonomy) => {
        response.taxonomy = taxonomy;
        // db.getMessages(data, (err, messages) => {
          // migrate to keywords
          // remove data requirements - no start & end date
          // response.messages = messages;
        callback(null, response);
        // });
      });
    });
  },
};

