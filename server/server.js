// import http from 'http';
// import express from 'express';
// import io from 'socket.io';
// import bodyparser from 'body-parser';
// import chatbot from './chatterbot/chatbotController.js';

// const routes = require('./config/routes.js');

// const app = express();
// const theServer = http.Server(app);
// const ioServer = io(theServer);

// const port = process.env.PORT || 1337;
// app.use(express.static(__dirname + '/../client'));
// app.use(bodyparser);
// routes(app);

// ioServer.on('connection', (socket) => {
//   console.log('a user connected: ', socket);

//   let msgCount = 0;
//   socket.on('message', (msg) => {
//     chatbot.response(socket.conn.id + msgCount.toString(), msg, (response) => {
//       socket.emit(response);
//     });
//     msgCount++;
//   });
// });

// theServer.listen(port, () => {
//   console.log('listening on localhost:', port);
// });

import http from 'http';
import express from 'express';
import io from 'socket.io';

const routes = require('./config/routes.js');

const app = express();
const theServer = http.Server(app);
const ioServer = io(theServer);

const port = process.env.PORT || 1337;
app.use(express.static(__dirname + '/../client'));
routes(app);

ioServer.on('connection', (socket) => {
  console.log('a user connected: ', socket);
});


const server = theServer.listen(port, () => {
  console.log('listening on localhost:1337');
});

