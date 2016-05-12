const http = require('http');
const express = require('express');
const io = require('socket.io');
const bodyparser = require('body-parser');
const botkit = require('./botkit.js');
botkit();
const routes = require('./config/routes.js');

const chat = require('./controllers/chatController.js');

const app = express();
routes(app);
const theServer = http.Server(app);
const ioServer = io(theServer);
chat.startDbPoll(ioServer);


const logger = require('./logger.js');
const passport = require('passport');

logger.log('debug', 'environment port', process.env.PORT);
const port = process.env.PORT || 1337;

app.use(passport.initialize());

/* config */
app.use(express.static(`${__dirname}/../client`));
app.use(bodyparser.json()); /* For req.body */
app.use(bodyparser.urlencoded({ extended: true }));

/* passport session with mongoose store */
const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
app.use(require('cookie-parser')());
app.use(session({
    // store: new MongoStore(options),
  resave: true,
  saveUninitialized: true,
  secret: 'fooooooo',
}));

app.use(passport.initialize());
app.use(passport.session());

const clients = {};

ioServer.on('connection', socket => {
  logger.log('info', 'a user connected: ', socket.conn.id);
  clients[socket.conn.id] = { org: 'HackReactor' };

  socket.on('userInfo', info => {
    // TODO only log single parameter from client info
    logger.log('info', 'user registered ', info);
    clients[socket.conn.id] = info;
  });

  socket.on('message', msg => {
    logger.log('info', 'client - ', msg);
    analyzerController.setAnalysis(msg);
    chatbot.response(0, msg, (err, response) => {
      if (err) { logger.log('error', err); }
      logger.log('info', 'bot says - ', response);
      socket.emit('message', response);
    });

    analyzerController.getEmotions(clients[socket.conn.id].org, (err, response) => {
      const analysis = { emotions: response };
      if (err) { logger.log('error', 'Analyzer Socket error ', err); }
      logger.log('debug', 'Socket response message -', response);
      analyzerController.getTaxonomy(clients[socket.conn.id], (taxErr, taxResponse) => {
        if (!taxErr) { analysis.taxonomy = taxResponse; }
        ioServer.emit('emotions', analysis);
        logger.log('debug', 'Socket response - ', analysis);
      });
    });
  });

  socket.on('emotions', () => {
    logger.log('debug', 'emotions query', clients[socket.conn.id].org);
    analyzerController.getEmotions(clients[socket.conn.id].org, (err, response) => {
      if (err) { logger.log('error', 'Analyzer Socket emotions', err); }
      const analysis = { emotions: response };
      analyzerController.getTaxonomy(clients[socket.conn.id], (taxErr, taxResponse) => {
        if (!taxErr) { analysis.taxonomy = taxResponse; }
        socket.emit('emotions', analysis);
        logger.log('debug', 'Socket response - ', analysis);
      });
    });
  });

  socket.on('orgMessages', () => {
    analyzerController.getMessages(clients[socket.conn.id].org, (err, response) => {
      if (err) { logger.log('error', 'Analyzer Socket orgMessages', err); }
      logger.log('debug', 'Socket response - ', response);
      socket.emit('emotions', response);
    });
  });

  socket.on('disconnect', () => {
    // TODO only log single parameter from client info
    logger.log('info', 'user disconnected', clients[socket.conn.id]);
    delete clients[socket.conn.id];
  });
});

theServer.listen(port, () => {
  logger.log('info', 'listening on localhost:', port);
});
