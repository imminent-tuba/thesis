const analyzerController = require('../controllers/analyzerController.js');
const slackBot = require('../controllers/slackController.js');
const SlackOAuth2 = require('../controllers/oauth2Slack.js');

module.exports = (app) => {
  // app.get('/analysis', analyzerController.setAnalysis);
  app.get('/getanalysis', analyzerController.getAnalysis);
  app.post('/slackBot', slackBot.postMessage);
  /* Login, Logout, Signup */
  app.post('/login/slack', SlackOAuth2.login); /* cb(req, res) */
  // app.post('/signup', Oauth2.signup);
  // app.get('/', chatterBot)
};
