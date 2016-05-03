import analyzerModel from '../models/analyzerModel.js';
import AlchemyApiKey from '../config/AlchemyApiKey.js';
//Create the AlchemyAPI object
import AlchemyAPI from 'alchemy-api';
const alchemyapi = new AlchemyAPI(AlchemyApiKey);

//DemoText for test, replace data in the call to alchemyapi.emotion for this variable (demoText)
//const demoText = 'Yesterday good Bob destroyed my fancy iPhone in beautiful Denver, Colorado. I guess I will have to head over to the Apple Store and buy a new one.';
const demoText = 'I may run out of messages to text you. I may run out of jokes, too. I may also run out of battery, but my heart won\'t run out of space for you!';

//Beta Method that is not included in the AlchemyAPI
AlchemyAPI.prototype.emotion = function (data, options, cb) {
  this._doRequest(this._getQuery(data, options, "GetEmotion"), cb);
};

module.exports = {
  setAnalysis: (data) => {
    //call Alchemy API (data, options, callback)
    //params: @data, message that we received from the chat
    alchemyapi.emotion(data, {}, (err, response) => {
      //Create an object with the information that we need;
      const data = { channel: 'general', language: response.language, emotions: response.docEmotions };
      //Call the Model (data, callback)
      analyzerModel.saveAnalysis(data, (data, db, callback) => {
        // Get the analysis collection
        const collection = db.collection('Analysis');
        // Insert the data into the MongoDB
        collection.insert(data, (err, result) => {
          //result of the insert data
          if (err) { console.log('Retrieve data err ', err); }
          //call the callback that close the connetion from the DB
          callback(err, result);
        });
      });
    });
  },
  getAnalysis: (callbackSocket) => {
    console.log('Emotions Controller');
    //Call the Model (channel, callback)
    const channel = 'general';
    analyzerModel.getAnalysis(channel, (data, db, callback) => {
      //retrieve the information for
      const emotionsData = db.collection('Analysis').find({ channel: channel });
      //obj to store the AVG emotion for the channel
      let emotionAVG = { anger: 0, disgust: 0, fear: 0, joy: 0, sadness: 0 };
      let numOfData = emotionsData.s.numberOfRetries;
      let numOfEmotions = 0;
      emotionsData.each((err, result) => {
        numOfData--;
        if (result != null){
          numOfEmotions++;
          //iterate across the result obj from the DB and store the result in emotionAVG
          //calculate the AVG for every key in the objs
          for (let key in result.emotions) {
            emotionAVG[key] += +result.emotions[key];
            if (numOfData === 0) {
              emotionAVG[key] /= numOfEmotions;
            }
          }
        }
        //close the connection in the DB
        callback(err, result);
        //if there are no more objs to process, return the emotionAVG to the client
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
