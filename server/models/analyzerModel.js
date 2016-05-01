import db from '../db/dbConfig.js';


module.exports = {
  saveAnalysis: (data, callback) => {
    db.connection(data, callback);
  },
  getAnalysis: (channel, callback) => {
    db.connection(channel, callback);
  },
};
