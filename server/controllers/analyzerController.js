const analyzerModel = require('../models/analyzerModel.js');
const AlchemyApiKey = require('../config/AlchemyApiKey.js');

const AlchemyAPI = require('alchemy-api');
const alchemyapi = new AlchemyAPI(AlchemyApiKey);

const logger = require('../logger.js');

// Beta Method that is not included in the AlchemyAPI
AlchemyAPI.prototype.emotion = (data, options, cb) => {
  this._doRequest(this._getQuery(data, options, 'GetEmotion'), cb);
};

module.exports = {
  setAnalysis: (data) => {
    alchemyapi.emotion(data, {}, (err, response) => {
      if (err) { logger.log('error', 'alchemy error - ', err); }
      logger.log('debug', 'Response Alchemy - ', response);
      const emotionData = {
        channel: 'general',
        language: response.language,
        emotions: response.docEmotions,
      };
      analyzerModel.saveAnalysis(emotionData, (analysisData, db, callback) => {
        const collection = db.collection('Analysis');
        collection.insert(analysisData, (collectionErr, result) => {
          if (collectionErr) { logger.log('error', 'Retrieve data err ', err); }
          callback(collectionErr, result);
        });
      });
    });
  },
  getAnalysis: (callbackSocket) => {
    const channel = 'general';
    analyzerModel.getAnalysis(channel, (data, db, callback) => {
      const emotionsData = db.collection('Analysis').find({ channel: channel });
      const emotionAVG = { anger: 0, disgust: 0, fear: 0, joy: 0, sadness: 0 };
      let numOfData = 0;
      db.collection('Analysis').find({ channel: channel }).count((err, count) => {
        if (err) { logger.log('error', 'ERR COUNT ', err); }
        numOfData = count;
      });
      let numOfEmotions = 0;
      emotionsData.each((err, result) => {
        if (err) { logger.log('error', 'find emotions error - ', err); }
        numOfData--;
        if (result != null) {
          numOfEmotions++;
          for (let key in result.emotions) {
            emotionAVG[key] += +result.emotions[key];
            if (numOfData === 0) {
              emotionAVG[key] /= numOfEmotions;
            }
          }
        }
        callback(err, result);
        if (numOfData === 0) { callbackSocket(err, emotionAVG); }
      });
    });
  },
};
