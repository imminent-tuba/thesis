const db = require('../db/dbConfig.js');


module.exports = {
  saveAnalysis: (data, callback) => {
    const msg = data.msg;
    const user = data.user;
    const emotions = data.emotions;
    const taxonomy = data.taxonomy[0];
    console.log('msg', msg);
    console.log('emotions', emotions);
    console.log('taxonomy', taxonomy);

    const queryMSG = 'INSERT INTO MESSAGE (text_msg, org_id, user_id) SELECT * FROM (select "' + msg  + '", (select org_id from user where username = "Charlie"),(select id from user where username = "Charlie")) AS temp WHERE NOT EXISTS (SELECT id FROM MESSAGE WHERE text_msg= "' + msg + '" and user_id = (SELECT id from user where username = "Charlie"))LIMIT 1';
    db.query(queryMSG, (errMsg, resultsMsg) => {
      console.log('errMsg', errMsg);
      console.log('resultsMsg', resultsMsg);
      const queryEmotions = 'INSERT INTO EMOTIONS (anger,disgust,fear,joy,sadness,msg_id) VALUES ("' + emotions.anger +'","' + emotions.disgust + '","' + emotions.fear + '","' + emotions.joy + '","' + emotions.sadness + '", (SELECT id FROM MESSAGE WHERE text_msg= "' + data.msg + '"))';
      db.query(queryEmotions, (errEmotions, resultsEmotions) => {
        if (taxonomy) {
          console.log('resultsEmotions', resultsEmotions);
          const queryTaxonomy = 'INSERT INTO TAXONOMY (label,score,msg_id) VALUES ("' + taxonomy.label + '","' + taxonomy.score + '", (SELECT id FROM MESSAGE WHERE text_msg= "' + data.msg + '"))';
          db.query(queryTaxonomy, (errTaxonomy, resultsTaxonomy) => {
            console.log('resultsTaxonomy', resultsTaxonomy);
            callback(errTaxonomy, resultsTaxonomy);
          });
        } else {
          console.log('errEmotions', errEmotions);
          console.log('resultsEmotions', resultsEmotions);
          callback(errEmotions, resultsEmotions);
        }
      });
    });
  },

  getEmotions: (org, callback) => {
    // 'SELECT AVG(anger) as anger,AVG(disgust)as disgust,AVG(fear) as fear,AVG(joy) as joy,AVG(sadness) as sadness, u.username FROM EMOTIONS e inner join MESSAGE m on e.msg_id = m.id inner join user u on m.user_id = u.id group by username'
    const queryMSG = 'SELECT AVG(anger) as anger,AVG(disgust)as disgust,AVG(fear) as fear,AVG(joy) as joy,AVG(sadness) as sadness, u.username FROM EMOTIONS e inner join MESSAGE m on e.msg_id = m.id inner join user u on m.user_id = u.id group by username';
    db.query(queryMSG, (errEmotions, resultsEmotions) => {
      console.log('errMsg', errEmotions);
      console.log('resultsEmotions', resultsEmotions[0]);
      callback(errEmotions, resultsEmotions[0]);
    });
  },

  getMessages: (data, callback) => {
    const org = data.org;
    const startDate = data.startDate;
    const endDate = data.endDate;

    // 'SELECT m.text_msg, u.username FROM MESSAGE m inner join user u on m.user_id = u.id'
    const queryMSG = 'SELECT m.text_msg, u.username FROM MESSAGE m inner join user u on m.user_id = u.id';
    db.query(queryMSG, (errMsg, resultsMsg) => {
      callback(errMsg, resultsMsg);
    });
  },
};



