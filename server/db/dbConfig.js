const MongoClient = require('mongodb').MongoClient;
const logger = require('../logger.js');

const url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
module.exports = {
  connection: (data, callback) => {
    MongoClient.connect(url, (err, db) => {
      if (err) { logger.log('error', 'DB conection err', err); }
      callback(data, db, (connectErr, result) => {
        if (connectErr) { logger.log('error', 'dbconfig line 11', connectErr); }
        db.close();
      });
    });
  },
};
