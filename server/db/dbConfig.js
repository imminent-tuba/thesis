<<<<<<< 63f0bfedd53dd13ac130a027e658e160ae190bf9
// const MongoClient = require('mongodb').MongoClient;
// const logger = require('../logger.js');
=======
const MongoClient = require('mongodb');
const logger = require('../logger.js');
>>>>>>> Add Slack authenication

// const url = 'mongodb://localhost:27017/myproject';
// // Use connect method to connect to the Server
// module.exports = {
//   connection: (data, callback) => {
//     MongoClient.connect(url, (err, db) => {
//       if (err) { logger.log('error', 'DB conection err', err); }
//       callback(data, db, (connectErr, result) => {
//         if (connectErr) { logger.log('error', 'dbconfig line 11', connectErr); }
//         db.close();
//       });
//     });
//   },
// };

const mysql = require('mysql');

const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'chatAnalysis',
});
connection.connect();

module.exports = connection;