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

console.log(process.env.PORT);
const port = process.env.PORT || 1337;
app.use(express.static(`${__dirname}/../client`));
app.use(bodyparser);
routes(app);


ioServer.on('connection', (socket) => {
  console.log('a user connected: ', socket.conn.id);

  socket.on('message', (msg) => {
    console.log('client - ', msg);
    analyzerController.setAnalysis(msg);
    chatbot.response(msg, (err, response) => {
      if (err) { console.log(err); }
      console.log('bot says - ', response);
      socket.emit('message', response);

      analyzerController.getAnalysis((analysisErr, analysisResponse) => {
        if (analysisErr) { console.log(err); }
        socket.emit('emotions', analysisResponse);
      });
    });
  });

  socket.on('emotions', () => {
    analyzerController.getAnalysis((err, response) => {
      if (err) { console.log(err); }
      socket.emit('emotions', response);
    });
  });

  socket.on('disconnect', () => { console.log('user disconnected'); });
});

theServer.listen(port, () => {
  console.log('listening on localhost:', port);
});
