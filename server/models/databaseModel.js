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

const isPresent = (data, type) => {
  if (!data.length) {
    logger.log('debug', type, 'is empty');
    return false;
  }
  return true;
};

module.exports = {
  saveMessage: (message, callback) => {
    const query = `INSERT INTO MESSAGE (text_msg, org_id, user_id) SELECT * FROM (select "${message}", (SELECT org_id from USER where username = "Charlie"),(SELECT id from USER where username = "Charlie")) AS temp WHERE NOT EXISTS (SELECT id FROM MESSAGE WHERE text_msg= "${message}" and user_id = (SELECT id from USER where username = "Charlie"))LIMIT 1`;
    db.query(query, dbCallback('Save Message', callback));
  },
  saveEmotions: (emotions, message, callback) => {
    if (!isPresent(emotions, 'emotions')) {
      callback(null, []);
      return;
    }
    const query = `INSERT INTO EMOTIONS (anger,disgust,fear,joy,sadness,msg_id) VALUES ("${emotions.anger}","${emotions.disgust}","${emotions.fear}","${emotions.joy}","${emotions.sadness}", (SELECT id FROM MESSAGE WHERE text_msg= "${message}"))`;
    db.query(query, dbCallback('Save Emotions', callback));
  },
  saveTaxonomy: (taxonomy, message, callback) => {
    if (!isPresent(taxonomy, 'taxonomy')) {
      callback(null, []);
      return;
    }
    taxonomy.forEach((value) => {
      const query = `INSERT INTO TAXONOMY (label,score,msg_id) VALUES ("${value.label}","${value.score}", (SELECT id FROM MESSAGE WHERE text_msg= "${message}"))`;
      db.query(query, dbCallback('Save Taxonomy', (err, res) => {}));
    });
    callback(null, taxonomy);
  },
  saveKeywords: (keywords, message, callback) => {
    if (!isPresent(keywords, 'keywords')) {
      callback(null, []);
      return;
    }
    keywords.forEach((keyword) => {
      const query = `INSERT INTO KEYWORDS (relevance,keyword_text,msg_id) VALUES ("${keyword.relevance}","${keyword.text}", (SELECT id FROM MESSAGE WHERE text_msg= "${message}"))`;
      db.query(query, dbCallback('Save Keywords', (err, res) => {}));
    });
    callback(null, keywords);
  },
  // getEmotions org as first argument?
  getEmotions: callback => {
    const query = 'SELECT SUM(anger) as anger,SUM(disgust)as disgust,SUM(fear) as fear,SUM(joy) as joy,SUM(sadness) as sadness, u.username FROM EMOTIONS e inner join MESSAGE m on e.msg_id = m.id inner join USER u on m.user_id = u.id group by username';
    db.query(query, dbCallback('Get Emotions', callback));
  },
  getMessages: (data, callback) => {
    const query = `SELECT m.text_msg, u.username FROM MESSAGE m inner join USER u on m.user_id = u.id BETWEEN "${data.startDate}%"" AND "${data.endDate}%""`;
    db.query(query, dbCallback('Get Messages', callback));
  },
  getTaxonomy: callback => {
    const query = 'SELECT label, SUM(score), COUNT(*) AS times FROM taxonomy GROUP BY label';
    db.query(query, dbCallback('Get taxonomy', callback));
  },
  getKeywords: callback => {
    const query = 'SELECT keyword_text, SUM(relevance), COUNT(*) AS times FROM keywords GROUP BY keyword_text';
    db.query(query, dbCallback('Get keywords', callback));
  },
};
