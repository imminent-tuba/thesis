const analyzerModel = require('../models/analyzerModel.js');
const AlchemyApiKey = require('../config/AlchemyApiKey.js');

const AlchemyAPI = require('alchemy-api');
const alchemyapi = new AlchemyAPI(AlchemyApiKey);

// Beta Method that is not included in the AlchemyAPI
AlchemyAPI.prototype.emotion = function(data, options, cb) {
  this._doRequest(this._getQuery(data, options, 'GetEmotion'), cb);
};

module.exports = {
  setAnalysis: (data) => {
    alchemyapi.emotion(data, {}, (err, response) => {
      // Create an object with the information that we need;
      console.log('Response Alchemy ->', response);
      const data = { channel: 'general', language: response.language, emotions: response.docEmotions };
      // Call the Model (data, callback)
      analyzerModel.saveAnalysis(data, (data, db, callback) => {
        // Get the analysis collection
        const collection = db.collection('Analysis');
        // Insert the data into the MongoDB
        collection.insert(data, (err, result) => {
          // result of the insert data
          if (err) { console.log('Retrieve data err ', err); }
          // call the callback that close the connetion from the DB
          callback(err, result);
        });
      });
    });
  },
  getAnalysis: (callbackSocket) => {
    const channel = 'general';
    analyzerModel.getAnalysis(channel, (data, db, callback) => {
      const emotionsData = db.collection('Analysis').find({ channel: channel });
      let emotionAVG = { anger: 0, disgust: 0, fear: 0, joy: 0, sadness: 0 };
      let numOfData = 0;
      db.collection('Analysis').find({ channel: channel }).count(function(err, count) {
        if (err) {console.log('ERR COUNT ', err)}
        numOfData = count;
      });
      let numOfEmotions = 0;
      emotionsData.each((err, result) => {
        if (err) {
          console.log('find emotions error ---- ', err);
        }
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
        if (numOfData === 0) {
          callbackSocket(err, emotionAVG);
        }
      });
    });
  },
};
