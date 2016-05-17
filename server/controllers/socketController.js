const logger = require('../logger.js');
const chat = require('./chatController.js');
const clients = {};
const DATA_REFRESH_RATE = 1000;
let isUpdated = false;


module.exports = ioServer => {
  setInterval(() => {
    isUpdated = chat.callDb(ioServer, isUpdated);
  }, DATA_REFRESH_RATE);

  ioServer.on('connection', socket => {
    logger.log('info', 'a user connected: ', socket.conn.id);
    clients[socket.conn.id] = { org: 'HackReactor' };

    socket.on('data', () => chat.callDb(socket, true));

    socket.on('userInfo', info => {
      // TODO only log single parameter from client info
      logger.log('info', 'user registered ', info);
      clients[socket.conn.id] = info;
    });

    socket.on('message', msg => {
      logger.log('info', 'client - ', msg);
      chat.messageReceived(msg, (err, res) => {
        socket.emit('message', res);
        isUpdated = true;
      });
    });

    socket.on('disconnect', () => {
      // TODO only log single parameter from client info
      logger.log('info', 'user disconnected', clients[socket.conn.id]);
      delete clients[socket.conn.id];
    });
  });
};
