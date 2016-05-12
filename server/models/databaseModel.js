const db = require('../db/dbConfig.js');
const logger = require('../logger.js');

const dbCallback = (action, callback) =>
  (err, res) => {
    if (err) {
      logger.log('error', `Cannot ${action}`, err);
      callback(err, null);
    } else {
      callback(null, res);
    }
  };

module.exports = {
  saveMessage: (data, callback) => {
    const query = `INSERT INTO MESSAGE (text_msg, org_id, user_id) SELECT * FROM (select "${data.msg}", (select org_id from user where username = "Charlie"),(select id from user where username = "Charlie")) AS temp WHERE NOT EXISTS (SELECT id FROM MESSAGE WHERE text_msg= "${data.msg}" and user_id = (SELECT id from user where username = "Charlie"))LIMIT 1`;
    db.query(query, dbCallback('Save Message', callback));
  },
  saveEmotions: (data, callback) => {
    const query = `INSERT INTO EMOTIONS (anger,disgust,fear,joy,sadness,msg_id) VALUES ("${data.emotions.anger}","${data.emotions.disgust}","${data.emotions.fear}","${data.emotions.joy}","${data.emotions.sadness}", (SELECT id FROM MESSAGE WHERE text_msg= "${data.msg}"))`;
    db.query(query, dbCallback('Save Emotions', callback));
  },
  saveTaxonomy: (data, callback) => {
    const query = `INSERT INTO TAXONOMY (label,score,msg_id) VALUES ("${data.taxonomy.label}","${data.taxonomy.score}", (SELECT id FROM MESSAGE WHERE text_msg= "${data.msg}"))`;
    db.query(query, dbCallback('Save Taxonomy', callback));
  },
  // getEmotions org as first argument?
  getEmotions: callback => {
    const query = 'SELECT SUM(anger) as anger,SUM(disgust)as disgust,SUM(fear) as fear,SUM(joy) as joy,SUM(sadness) as sadness, u.username FROM EMOTIONS e inner join MESSAGE m on e.msg_id = m.id inner join user u on m.user_id = u.id group by username';
    db.query(query, dbCallback('Get Emotions', callback));
  },
  getMessages: (data, callback) => {
    const query = `SELECT m.text_msg, u.username FROM MESSAGE m inner join user u on m.user_id = u.id BETWEEN "${data.startDate}%"" AND "${data.endDate}%""`;
    db.query(query, dbCallback('Get Messages', callback));
  },
  getTaxonomy: callback => {
    const query = 'SELECT label, SUM(score), COUNT(*) AS times FROM taxonomy GROUP BY label';
    db.query(query, dbCallback('Get taxonomy', callback));
  },
};
