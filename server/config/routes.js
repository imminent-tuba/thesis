import analyzerController from '../controllers/analyzerController.js';

module.exports = (app) => {
  app.get('/analysis', analyzerController.getAnalysis);
};
