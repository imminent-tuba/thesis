const mysql = require('mysql');

const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'chatAnalysis',
});
connection.connect();

module.exports = connection;
