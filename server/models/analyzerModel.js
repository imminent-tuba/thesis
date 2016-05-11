const db = require('../db/dbConfig.js');
const logger = require('../logger.js');

module.exports = {
  saveAnalysis: (data, callback) => {
    const msg = data.msg;
    const user = data.user;
    const emotions = data.emotions;
    const taxonomy = data.taxonomy[0];

    console.log('Model data -> ', emotions);
    console.log('Model data -> ', taxonomy);

    const queryMSG = 'INSERT INTO MESSAGE (text_msg, org_id, user_id) SELECT * FROM (select "' + msg  + '", (select org_id from user where username = "Charlie"),(select id from USER where username = "Charlie")) AS temp WHERE NOT EXISTS (SELECT id FROM MESSAGE WHERE text_msg= "' + msg + '" and user_id = (SELECT id from USER where username = "Charlie"))LIMIT 1';
    db.query(queryMSG, (errMsg, resultsMsg) => {
      if (errMsg) {logger.log('debug', 'Response Insert MESSAGE - ', errMsg);}
      const queryEmotions = 'INSERT INTO EMOTIONS (anger,disgust,fear,joy,sadness,msg_id) VALUES ("' + emotions.anger +'","' + emotions.disgust + '","' + emotions.fear + '","' + emotions.joy + '","' + emotions.sadness + '", (SELECT id FROM MESSAGE WHERE text_msg= "' + data.msg + '"))';
      db.query(queryEmotions, (errEmotions, resultsEmotions) => {
        if (errEmotions) {logger.log('debug', 'Response Insert EMOTIONS - ', errEmotions);}
        if (taxonomy) {
          const queryTaxonomy = 'INSERT INTO TAXONOMY (label,score,msg_id) VALUES ("' + taxonomy.label + '","' + taxonomy.score + '", (SELECT id FROM MESSAGE WHERE text_msg= "' + data.msg + '"))';
          db.query(queryTaxonomy, (errTaxonomy, resultsTaxonomy) => {
            if (errTaxonomy) {logger.log('debug', 'Response Insert TAXONOMY - ', errTaxonomy);}
            callback(errTaxonomy, resultsTaxonomy);
          });
        } else {
          callback(errEmotions, resultsEmotions);
        }
      });
    });
  },

  getEmotions: (org, callback) => {
    const queryMSG = 'SELECT AVG(anger) as anger,SUM(disgust)as disgust,SUM(fear) as fear,SUM(joy) as joy,SUM(sadness) as sadness, u.username FROM EMOTIONS e inner join MESSAGE m on e.msg_id = m.id inner join USER u on m.user_id = u.id group by username';
    db.query(queryMSG, (errEmotions, resultsEmotions) => {
      if (errEmotions) {
        logger.log('debug', 'Response Retreive EMOTIONS - ', errEmotions);
      } else {
        callback(errEmotions, resultsEmotions[0]);  
      }
    });
  },

  getMessages: (data, callback) => {
    const org = data.org;
    const startDate = data.startDate;
    const endDate = data.endDate;

    const queryMSG = 'SELECT m.text_msg, u.username FROM MESSAGE m inner join user u on m.user_id = u.id BETWEEN "' + startDate + '%"" AND "' + endDate + '%""';
    db.query(queryMSG, (errMsg, resultsMsg) => {
      if (errMsg) {
        logger.log('debug', 'Response Retreive MESSAGES - ', errMsg);
      } else {
        callback(errMsg, resultsMsg);  
      }
    });
  },

  getTaxonomy: (data, callback) => {
    const org = data.org;

    const queryMSG = 'SELECT label, SUM(score), COUNT(*) AS times FROM taxonomy GROUP BY label';
    db.query(queryMSG, (err, results) => {
      if (err) {
        logger.log('error', 'db taxonomy error - ', err);
        callback(err, null);
      } else {
        logger.log('debug', 'db taxonomy response - ', results);
        callback(null, results);
      }
    });
  },
};
