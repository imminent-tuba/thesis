import analyzerController from '../controllers/analyzerController.js';
// import slack from '../controllers/slackController.js';

module.exports = (app) => {
  app.get('/analysis', analyzerController.setAnalysis);
  app.get('/getanalysis', analyzerController.getAnalysis);
  // app.post('/slack', slack.postMessage);
};
