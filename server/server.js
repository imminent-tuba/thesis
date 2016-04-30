import http from 'http';
import express from 'express';
import io from 'socket.io';
import bodyparser from 'body-parser';
import chatbot from './chatterbot/chatbotController.js';

const routes = require('./config/routes.js');

const app = express();
const theServer = http.Server(app);
const ioServer = io(theServer);

const port = process.env.PORT || 1337;
app.use(express.static(`${__dirname}/../client`));
app.use(bodyparser);
routes(app);

ioServer.on('connection', (socket) => {
  console.log('a user connected: ', socket);

  socket.on('message', (msg) => {
    chatbot.response(socket.conn.id, msg, (err, response) => {
      if (err) { console.log(err); }
      socket.emit('message', response);
    });
  });

  socket.on('disconnect', () => { console.log('user disconnected'); });
});

theServer.listen(port, () => {
  console.log('listening on localhost:', port);
});
