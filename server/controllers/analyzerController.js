import Profile from '../models/analyzerModel.js';
import AlchemyApiKey from '../config/AlchemyApiKey.js';
//Create the AlchemyAPI object
import AlchemyAPI from 'alchemy-api';
const alchemyapi = new AlchemyAPI(AlchemyApiKey);

//const demoText = 'Yesterday good Bob destroyed my fancy iPhone in beautiful Denver, Colorado. I guess I will have to head over to the Apple Store and buy a new one.';
const demoText = 'I may run out of messages to text you. I may run out of jokes, too. I may also run out of battery, but my heart won\'t run out of space for you!';
module.exports = {
  getAnalysis: (req, res) => {
    AlchemyAPI.prototype.emotion = (data, options, cb) => {
      this._doRequest(this._getQuery(data, options, "GetEmotion"), cb);
    };

    console.log('call Analyzer ', demoText);
    alchemyapi.sentiment(demoText, {}, (err, response) => {
      if (err) {
        res.send(500);
      }
      console.log('sentiment response ======', response);
      res.json(response);
    });

    alchemyapi.sentiment_targeted(demoText, 'jokes', {}, (err, response) => {
      console.log('sentiment_targeted err', err);
      console.log('sentiment_targeted response ======', response);
    });
    alchemyapi.emotion(demoText, {}, (err, response) => {
      console.log('sentiment_targeted err', err);
      console.log('emotion response ======', response);
    });
    alchemyapi.relations(demoText, {}, (err, response) => {
      console.log('relations response ======', response);
    });
    alchemyapi.concepts(demoText, {}, (err, response) => {
      console.log('concepts response ======', response);
    });
    alchemyapi.entities(demoText, {}, (err, response) => {
      console.log('entities response ======', response);
    });
    alchemyapi.keywords(demoText, {}, (err, response) => {
      console.log('keywords response ======', response);
    });
    alchemyapi.taxonomies(demoText, {}, (err, response) => {
      console.log('taxonomies response ======', response);
    });
    alchemyapi.category(demoText, {}, (err, response) => {
      console.log('category response ======', response);
    });
    alchemyapi.language(demoText, {}, (err, response) => {
      console.log('language response ======', response);
    });
    res.end();
  },
};
