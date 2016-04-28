import http from 'http';
import express from 'express';
import io from 'socket.io';

var app = express();
var theServer = http.Server(app);
var ioServer = io(theServer);

var port = process.env.PORT || 1337;
app.use(express.static(__dirname + '/../client'));

ioServer.on('connection', function(socket){
  console.log('a user connected');
});

var server = theServer.listen(port, function(){
  console.log('listening on localhost:1337');
});