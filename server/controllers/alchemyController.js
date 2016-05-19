const AlchemyApiKey = require('../config/AlchemyApiKey.js');
const AlchemyAPI = require('alchemy-api');
const alchemyapi = new AlchemyAPI(AlchemyApiKey);
const logger = require('../logger.js');

// Beta Method that is not included in the AlchemyAPI
AlchemyAPI.prototype.emotion = function(data, options, cb) {
  this._doRequest(this._getQuery(data, options, 'GetEmotion'), cb);
};

const alchemyCallback = (action, callback) =>
  (err, res) => {
    if (res.status === 'ERROR') {
      logger.log('error', `Alchemy ${action} failed`, res.statusInfo);
      callback(err, null);
    } else {
      callback(null, res);
      logger.log('debug', `alchemy ${action} response`, res);
    }
  };

module.exports = {
  getEmotions: (message, callback) => {
    alchemyapi.emotion(message, {}, alchemyCallback('get emotions', callback));
  },
  getTaxonomy: (message, callback) => {
    alchemyapi.taxonomies(message, {}, alchemyCallback('get taxonomy', callback));
  },
  getKeywords: (message, callback) => {
    alchemyapi.keywords(message, {}, alchemyCallback('get keywords', callback));
  },
};
