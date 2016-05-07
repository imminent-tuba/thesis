const analyzerController = require('../controllers/analyzerController.js');
const slackBot = require('../controllers/slackController.js');
const OAuth2 = require('../controllers/OAuth2.js');
/* Passort */
const passport = require('passport');

module.exports = (app) => {
  // app.get('/analysis', analyzerController.setAnalysis);
  app.get('/getanalysis', analyzerController.getAnalysis);
  app.post('/slackBot', slackBot.postMessage);
  /* Passport Slack */
  // app.post('/login', OAuth2.Authenicate); /* cb(req, res) */
  app.get('/auth/slack', passport.authorize('slack'));
  app.get('/auth/slack/callback',
    passport.authorize('slack', {failureRedirect: '/failedUrl'}),
    function(req, res) {
      console.log('got to auth');
      res.redirect('/');
    }
  );

  // app.post('/signup', Oauth2.signup);
  // app.get('/', chatterBot)
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });


};
