const PyShell = require('python-shell');
const dgram = require('dgram');
const router = require('./botRouter.js');

const options = {
  mode: 'text',
  args: ['test'],
};

const LOCALHOST = '127.0.0.1';
const NODE_PORT = 41234;

// create UDP socket for conversing with bot
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg /* rinfo*/) => {
  const myMsg = JSON.parse(msg);
  router(myMsg);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(NODE_PORT, LOCALHOST);

// create std in/out listeners for error handling
const pyProcess = new PyShell('./chatterbot.py', options);

pyProcess.on('message', message => {
  console.log(message);
});

pyProcess.on('close', err => {
  if (err) { console.log('python error ', err); }
  else { console.log('python finished'); }
});

pyProcess.on('error', err => {
  if (err) { console.log('python error ', err); }
});

module.exports = {
  response: (id, message) => {
    const toSend = { id: id, message: message };
    server.send(JSON.stringify(toSend), 51234, 'localhost', (err) => {
      if (err) { console.log(err); }
    });
  },
  train: conversation => {
    conversation.unshift('xxstartxx');
    conversation.push('xxendxx');
    for (var i in conversation) {
      pyProcess.send(conversation[i]);
    }
  },
  init: () => pyProcess.send('xxtrainxx'),
};
