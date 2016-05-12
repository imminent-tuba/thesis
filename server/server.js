const http = require('http');
const express = require('express');
const io = require('socket.io');
const bodyparser = require('body-parser');
const logger = require('./logger.js');
const routes = require('./config/routes.js');
const socketRoutes = require('./controllers/socketController.js');
const passport = require('passport'); // TODO: Do we need this?

const app = express();
routes(app); // TODO: Do we need these?
app.use(passport.initialize()); // TODO: Do we need this
app.use(passport.session()); // TODO: Do we need this
const botkit = require('./botkit.js');
botkit();

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

const theServer = http.Server(app);
const ioServer = io(theServer);
socketRoutes(ioServer);

logger.log('debug', 'environment port', process.env.PORT);
const port = process.env.PORT || 1337;

theServer.listen(port, () => {
  logger.log('info', 'listening on *:', port);
});
