const analyzerController = require('../controllers/analyzerController.js');
const slackBot = require('../controllers/slackController.js');
// const OAuth2 = require('../controllers/OAuth2.js');
/* Passort */
const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;
const slackKeys = require('../config/SlackOAuth2ApiKey.js');
const User = require('../models/UserSchema.js');


module.exports = (app) => {
  app.get('/analysis', analyzerController.setAnalysis);
  app.get('/getanalysis', analyzerController.getAnalysis);
  app.post('/slackBot', slackBot.postMessage);

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  /* Passport Slack */
  passport.use(new SlackStrategy({
          clientID: slackKeys.clientID,
          clientSecret: slackKeys.clientSecret,
          callbackURL: slackKeys.callbackURL,
          scope: 'users:read',
          extendedUserProfile: false
    },  (accessToken, refreshToken, profile, done) => {
      /* save session. */
    }
  ))
  app.get('/auth/slack', passport.authenticate('slack'));
  app.get('/auth/slack/callback',
    passport.authenticate('slack', { failureRedirect: '/#/admin' }),
      function(req, res) {
        console.log('im inside of /auth/lack/callback');
        req.session.token = req.param('token');
        req.session.foo = 'foo';
        res.redirect('/#/analytics');
      });
};
