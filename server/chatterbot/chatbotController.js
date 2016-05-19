const logger = require('../logger.js');
const io = require('socket.io').listen(1234);

const clients = {};
const callbacks = {};
let callcount = 0;

io.on('connection', (socket) => {
  let ID = 0;
  socket.emit('botID');
  logger.log('info', 'a bot connected: ', socket.conn.id);

  socket.on('botID', (id) => {
    logger.log('info', 'bot registered - ', id);
    ID = id;
    clients[ID] = socket;
  });

  socket.on('chat', (msg) => {
    logger.log('info', 'from bot -', ID, msg);
    msg = JSON.parse(msg);
    try {
      callbacks[msg.id](null, msg.message.trim());
    }
    catch(err) {
      logger.log('error', 'chatterbot callback', err);
    }
  });

  socket.on('disconnect', () => {
    logger.log('info', 'bot disconnected', socket.conn.id);
    delete clients[ID];
  });
});

module.exports = {
  response: (id, message, callback) => {
    callcount = ++callcount % 3000;
    callbacks[callcount] = callback;
    const toSend = { id: callcount, message };
    try {
      clients[id].emit('chat', JSON.stringify(toSend));
    }
    catch(err) {
      logger.log('error', 'chatterbot response', err);
    }
  },
  train: (id, conversation) => {
    for (var i in conversation) {
      clients[id].emit('train', JSON.stringify(conversation[i]));
    }
    clients[id].emit('train', 'end');
  },
};
