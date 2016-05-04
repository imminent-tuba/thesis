const db = require('../db/dbConfig.js');


module.exports = {
  //params
  //@data, Information that needs to be stored (object)
  //@callback, function that the MongoClient.connect will call inside the connection to the DB
  saveAnalysis: (data, callback) => {
    db.connection(data, callback);
  },
  //params:
  //@channel, channel that we want to retreive the data
  //@callback, function that the MongoClient.connect will call inside the connection to the DB
  getAnalysis: (channel, callback) => {
    db.connection(channel, callback);
  },
};
