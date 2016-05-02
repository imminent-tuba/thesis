const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// 27017 is the default port for connecting to MongoDB
// const server = new mongodb.Server('127.0.0.1', 27017, {});
// const client = new mongodb.Db('ChatAnalysis', server);


const url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
module.exports = {
  connection: (data, callback) => {
    MongoClient.connect(url, (err, db) => {
      console.log('DB conection err', err);
      console.log("DB Connected correctly to server");
      callback(data, db, (err, result) => {
        db.close();
      });
    });
  },
};
