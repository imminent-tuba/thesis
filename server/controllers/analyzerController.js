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
      if (err) { console.log('alchemy emotion response error - ', err); } else {
        const emotionData = {
          channel: 'general',
          language: response.language,
          emotions: response.docEmotions,
        };
        analyzerModel.saveAnalysis(emotionData, (newData, db, callback) => {
          const collection = db.collection('Analysis');
          collection.insert(newData, (error, result) => {
            if (error) { console.log('Retrieve data err ', error); } else {
              callback(err, result);
            }
          });
        });
      }
    });
  },
  getAnalysis: (callbackSocket) => {
    const channel = 'general';
    analyzerModel.getAnalysis(channel, (data, db, callback) => {
      const emotionsData = db.collection('Analysis').find({ channel: channel });
      console.log('eeemotions - ', emotionsData);
      let emotionAVG = { anger: 0, disgust: 0, fear: 0, joy: 0, sadness: 0 };
      let numOfData = emotionsData.s.numberOfRetries;
      let numOfEmotions = 0;
      emotionsData.each((err, result) => {
        if (err) { console.log('find emotions error - ', err); }
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

    // console.log('call Analyzer ', demoText);
    // alchemyapi.sentiment(demoText, {}, (err, response) => {
    //   if (err) {
    //     res.send(500);
    //   }
    //   console.log('sentiment response ======', response);
    //   res.json(response);
    // });

    // alchemyapi.sentiment_targeted(demoText, 'jokes', {}, (err, response) => {
    //   console.log('sentiment_targeted err', err);
    //   console.log('sentiment_targeted response ======', response);
    // });
    // alchemyapi.emotion(demoText, {}, (err, response) => {
    //   console.log('sentiment_targeted err', err);
    //   console.log('emotion response ======', response);
    // });
    // alchemyapi.relations(demoText, {}, (err, response) => {
    //   console.log('relations response ======', response);
    // });
    // alchemyapi.concepts(demoText, {}, (err, response) => {
    //   console.log('concepts response ======', response);
    // });
    // alchemyapi.entities(demoText, {}, (err, response) => {
    //   console.log('entities response ======', response);
    // });
    // alchemyapi.keywords(demoText, {}, (err, response) => {
    //   console.log('keywords response ======', response);
    // });
    // alchemyapi.taxonomies(demoText, {}, (err, response) => {
    //   console.log('taxonomies response ======', response);
    // });
    // alchemyapi.category(demoText, {}, (err, response) => {
    //   console.log('category response ======', response);
    // });
    // alchemyapi.language(demoText, {}, (err, response) => {
    //   console.log('language response ======', response);
    // });
    // res.end();
  },
};
