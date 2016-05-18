const mysql = require('mysql');

const connection = mysql.createConnection({
  user: 'root',
  password: 'mysql',
  database: 'chatAnalysis',
});
connection.connect();

module.exports = connection;
