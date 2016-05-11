const logger = require('../logger.js');

/* Passort */
const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;
const slackKeys = require('../config/SlackOAuth2ApiKey.js');
const User = require('../models/UserSchema.js');

module.exports = (app) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  /* Passport Slack */
  passport.use(new SlackStrategy({
    clientID: slackKeys.clientID,
    clientSecret: slackKeys.clientSecret,
    callbackURL: slackKeys.callbackURL,
    scope: 'users:read',
    extendedUserProfile: false,
  }, (accessToken, refreshToken, profile, done) => {
      /* save session. */
  }));
  app.get('/auth/slack', passport.authenticate('slack'));
  app.get('/auth/slack/callback',
  passport.authenticate('slack', { failureRedirect: '/#/admin' }),
  (req, res) => {
    logger.log('debug', '/auth/lack/callback');
    req.session.token = req.param('token');
    req.session.foo = 'foo';
    res.redirect('/#/analytics');
  });
};
