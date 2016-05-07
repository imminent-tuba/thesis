const analyzerController = require('../controllers/analyzerController.js');
const slack = require('../controllers/slackController.js');

module.exports = (app) => {
  // app.get('/analysis', analyzerController.setAnalysis);
  app.get('/getanalysis', analyzerController.getAnalysis);
  app.post('/slack', slack.postMessage);
  app.post('/login', Oauth2.login);
  app.post('/signup', Oauth2.signup);
  // app.get('/', chatterBot)
};
