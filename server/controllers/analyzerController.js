const analyzerModel = require('../models/analyzerModel.js');
const AlchemyApiKey = require('../config/AlchemyApiKey.js');

const AlchemyAPI = require('alchemy-api');
const alchemyapi = new AlchemyAPI(AlchemyApiKey);

const logger = require('../logger.js');

// Beta Method that is not included in the AlchemyAPI
AlchemyAPI.prototype.emotion = function(data, options, cb) {
  this._doRequest(this._getQuery(data, options, 'GetEmotion'), cb);
};

module.exports = {
  setAnalysis: (data) => {
    console.log('Controller data ------> ', data);
    alchemyapi.emotion(data, {}, (errEmotion, responseEmotions) => {
      console.log('Controller data errEmotion-> ', errEmotion);
      console.log('Controller data responseEmotions-> ', responseEmotions);
      const alchemyData = {
        msg: data,
        channel: 'general',
        user: 'user',
        emotions: responseEmotions.docEmotions,
      };
      alchemyapi.taxonomies(data, {}, (errTaxonomy, responseTaxonomy) => {
        if (errTaxonomy) { logger.log('error', 'Alchemy taxonomy error', errTaxonomy); }
        alchemyData.taxonomy = responseTaxonomy.taxonomy;
        analyzerModel.saveAnalysis(alchemyData, (errModel, result) => {
          if (errModel != null) {
            logger.log('error', 'save analysis error - ', errModel);
          }
        });
      });
    });
  },
  getEmotions: (org, callbackSocket) => {
    analyzerModel.getEmotions(org, (err, analysis) => {
      if (err) {
        logger.log('error', 'getEmotions error - ', err);
        callbackSocket(err, null);
      } else {
        logger.log('debug', 'Response getEmotions Model - ', analysis);
        callbackSocket(null, analysis);
      }
    });
  },

  getMessages: (data, callbackSocket) => {
    analyzerModel.getMessages(data, (err, messages) => {
      if (err) { logger.log('error', 'get messages error - ', err); }
      logger.log('debug', 'Response getMessages Model - ', messages);
      callbackSocket(err, messages);
    });
  },

  getTaxonomy: (data, callbackSocket) => {
    analyzerModel.getTaxonomy(data, (err, taxonomy) => {
      if (err) {
        logger.log('error', 'get taxonomy error - ', err);
        callbackSocket(err, null);
      } else {
        logger.log('debug', 'taxonomy response - ', taxonomy);
        callbackSocket(null, taxonomy);
      }
    });
  },
};
