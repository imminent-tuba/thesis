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
    alchemyapi.emotion(data, {}, (errEmotion, responseEmotions) => {
      const alchemyData = {
        msg: data,
        channel: 'general',
        user: 'user',
        emotions: responseEmotions.docEmotions,
      };
      alchemyapi.taxonomies(data, {}, (errTaxonomy, responseTaxonomy) => {
        alchemyData.taxonomy = responseTaxonomy.taxonomy;
        analyzerModel.saveAnalysis(alchemyData, (errModel, result) => {
          if (errModel != null) {
            logger.log('debug', 'Response Alchemy - ', errModel);
          }
        });
      });
    });
  },
  getEmotions: (org, callbackSocket) => {
    const organization = org || 'HackReactor';
    analyzerModel.getEmotions(organization, (err, analysis) => {
      logger.log('debug', 'Response getEmotions Model - ', err);
      callbackSocket(err, analysis);
    });
  },

  getAnalysis: (data, callbackSocket) => {
    analyzerModel.getMessages(data, (err, messages) => {
      logger.log('debug', 'Response getMessages Model - ', err);
      callbackSocket(err, messages);
    });
  },
};
