const PyShell = require('python-shell');
const dgram = require('dgram');
const pySettings = require('../config/pythonSettings.js');
const logger = require('../logger.js');

const LOCALHOST = '127.0.0.1';
const NODE_PORT = 41234;

const callbacks = {};
let callcount = 0;

// create UDP socket for conversing with bot
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  logger.log('error', `server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg /* rinfo*/) => {
  const myMsg = JSON.parse(msg);
  myMsg.message = myMsg.message.replace('\n', '');
  callbacks[myMsg.id](null, myMsg.message);
  delete callbacks[myMsg.id];
});

server.on('listening', () => {
  const address = server.address();
  logger.log('info', `node listening ${address.address}:${address.port}`);
});

server.bind(NODE_PORT, LOCALHOST);

// create std in/out listeners for error handling
const pyProcess = new PyShell('./server/chatterbot/chatterbot.py', pySettings);

pyProcess.on('message', message => {
  logger.log('info', message);
});

pyProcess.on('close', err => {
  if (err) { logger.log('error', 'python error ', err); }
  else { logger.log('info', 'python closed'); }
});

pyProcess.on('error', err => {
  if (err) { logger.log('error', 'python error ', err); }
});

module.exports = {
  response: (message, callback) => {
    callcount = ++callcount % 3000;
    const Uid = callcount.toString();
    callbacks[Uid] = callback;
    const toSend = { id: Uid, message: message };
    server.send(JSON.stringify(toSend), 51234, 'localhost', (err) => {
      if (err) { logger.log('error', 'socket error', err); }
    });
  },
  train: conversation => {
    conversation.unshift('xxstartxx');
    conversation.push('xxendxx');
    for (var i in conversation) {
      pyProcess.send(conversation[i]);
    }
  },
  init: () => pyProcess.send('xxinitxx'),
};
