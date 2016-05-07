const db = require('../db/dbConfig.js');

module.exports = {
  saveUser: (data, callback) => {
    const queryOrg = 'INSERT INTO org (name) SELECT * FROM (select "' + data.org + '") AS temp WHERE NOT EXISTS (SELECT id FROM org WHERE name= ' + data.org + ')LIMIT 1';
    db.query(queryOrg, (err, results) => {
      const queryUser = 'insert into user (username, org_id, token) values ("'+ data.name +'", (SELECT id FROM org WHERE name= "'+ data.org+'"),"'+data.token+'")';
      db.query(queryUser, function(err, results) {
        console.log('Error signup',err);
        console.log('results signup',results);
        callback(err, results);
      });
    });
  }
};