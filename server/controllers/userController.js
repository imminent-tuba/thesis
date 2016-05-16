const userModel = require('../models/userModel.js');
const logger = require('../logger.js');

module.exports = {
  saveUser: (req, res) => {
    var params = req.query.id;
    userModel.saveUser(params, function(err, results) {
      if (!err) {
        res.json(results);
      } else {
        res.json(err);
      }
    });
  }
};
