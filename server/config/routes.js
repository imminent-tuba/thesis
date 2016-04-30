// import analyzerController from '../controllers/analyzerController.js';
import slack from '../controllers/slackController.js';

module.exports = (app) => {
  // app.get('/analysis', analyzerController.getAnalysis);
  app.post('/slack', slack.postMessage);
};
