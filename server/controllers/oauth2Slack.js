// const AuthyAPIKey = require('../config/Authy.js');
// const authy = require('authy');
/* passport.js */
const passport = require('passport');
const LocalStrategy = require('passport-slack').Strategy;
const SlackAPIKey = require('../config/SlackOAuth2ApiKey.js');
// const User = require(/* some model */);
const session = require('express-session');



module.exports = {
  /* handles all login, logout, signup */
  IsLoggedIn: (req, res, next) => {
    // /* End point URL ::: https://slack.com/oauth/authorize */
  },

  register: (req, res) => {

  },

  login: (req, res) => {
    passport.use(new LocalStrategy(
      function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
    ));
  },

  logout: (req, res) => {

  }
}
