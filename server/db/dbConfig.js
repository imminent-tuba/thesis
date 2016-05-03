const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
module.exports = {
  connection: (data, callback) => {
    MongoClient.connect(url, (err, db) => {
      if (err) { console.log('DB conection err', err); }
      callback(data, db, (err, result) => {
        if (err) { console.log('dbconfig line 11', err); }
        db.close();
      });
    });
  },
};
