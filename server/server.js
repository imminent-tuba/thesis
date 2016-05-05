const http = require('http');
const express = require('express');
const io = require('socket.io');
const bodyparser = require('body-parser');
const chatbot = require('./chatterbot/chatbotController.js');
const analyzerController = require('./controllers/analyzerController.js');

const routes = require('./config/routes.js');

const app = express();
const theServer = http.Server(app);
const ioServer = io(theServer);
const logger = require('./logger.js');

logger.log('debug', 'environment port', process.env.PORT);
const port = process.env.PORT || 1337;
app.use(express.static(`${__dirname}/../client`));
app.use(bodyparser);
routes(app);


ioServer.on('connection', (socket) => {
  logger.log('info', 'a user connected: ', socket.conn.id);

  socket.on('message', (msg) => {
    logger.log('info', 'client - ', msg);
    analyzerController.setAnalysis(msg);
    chatbot.response(msg, (err, response) => {
      if (err) { logger.log('error', err); }
      logger.log('info', 'bot says - ', response);
      socket.emit('message', response);

      analyzerController.getAnalysis((analysisErr, analysisResponse) => {
        if (analysisErr) { logger.log('error', analysisErr); }
        socket.emit('emotions', analysisResponse);
      });
    });

    analyzerController.getAnalysis((err, response) => {
      if (err) { logger.log('error', 'Analyzer Socket msg', err); }
      logger.log('debug', 'Socket response message -', response);
      ioServer.emit('emotions', response);
    });
  });

  socket.on('emotions', () => {
    analyzerController.getAnalysis((err, response) => {
      if (err) { logger.log('error', 'Analyzer Socket emotions', err); }
      logger.log('debug', 'Socket response - ', response);
      socket.emit('emotions', response);
    });
  });

  socket.on('disconnect', () => { logger.log('info', 'user disconnected'); });
});

theServer.listen(port, () => {
  logger.log('info', 'listening on localhost:', port);
});
