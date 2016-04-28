import http from 'http';
import express from 'express';
import io from 'socket.io';

const app = express();
const theServer = http.Server(app);
const ioServer = io(theServer);

const port = process.env.PORT || 1337;
app.use(express.static(__dirname + '/../client'));

ioServer.on('connection', (socket) => {
  console.log('a user connected: ', socket);
});

let server = theServer.listen(port, () => {
  console.log('listening on localhost:1337');
});
