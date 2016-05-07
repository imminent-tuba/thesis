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
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
const passport = require('passport');

logger.log('debug', 'environment port', process.env.PORT);
const port = process.env.PORT || 1337;

routes(app);
/* config */
app.use(express.static(`${__dirname}/../client`));
app.use(bodyparser.json()); /* For req.body */
app.use(bodyparser.urlencoded({ extended: true }));
// app.use(express.cookieParser());
// app.use(passport.session({
//   secret: 'session test'
//   // cookie:{ maxAge: 60000 }
// }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('cookie-parser')());




ioServer.on('connection', (socket) => {
  logger.log('info', 'a user connected: ', socket.conn.id);

  socket.on('message', (msg) => {
    logger.log('info', 'client - ', msg);
    analyzerController.setAnalysis(msg);
    chatbot.response(msg, (err, response) => {
      if (err) { logger.log('error', err); }
      logger.log('info', 'bot says - ', response);
      socket.emit('message', response);
    });

    analyzerController.getEmotions(org, (err, response) => {
      // if (err) { logger.log('error', 'Analyzer Socket msg', err); }
      // logger.log('debug', 'Socket response message -', response);
      console.log('analysisErr msg', response);
      ioServer.emit('emotions', response);
    });
  });

  socket.on('emotions', (org) => {
    console.log('org emotions', org);
    analyzerController.getEmotions(org, (err, response) => {
      // if (err) { logger.log('error', 'Analyzer Socket emotions', err); }
      // logger.log('debug', 'Socket response - ', response);
      console.log('analysisErr emotions', response);
      socket.emit('emotions', response);
    });
  });

  socket.on('orgMessages', (org) => {
    analyzerController.getAnalysis(org, (err, response) => {
      // if (err) { logger.log('error', 'Analyzer Socket emotions', err); }
      // logger.log('debug', 'Socket response - ', response);
      console.log('analysisErr emotions', response);
      socket.emit('emotions', response);
    });
  });

  socket.on('disconnect', () => { logger.log('info', 'user disconnected'); });
});

theServer.listen(port, () => {
  logger.log('info', 'listening on localhost:', port);
});
