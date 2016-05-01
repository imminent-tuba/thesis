const PyShell = require('python-shell');
const dgram = require('dgram');
const path = require('path');

const virtualEnvPath = path.relative(__dirname, '.virtualenvs/thesis/bin/python3');

const options = {
  mode: 'text',
  args: ['test'],
  pythonPath: __dirname + '/../' + virtualEnvPath,
};

const LOCALHOST = '127.0.0.1';
const NODE_PORT = 41234;

const callbacks = {};
let callcount = 0;

// create UDP socket for conversing with bot
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
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
  console.log(`node listening ${address.address}:${address.port}`);
});

server.bind(NODE_PORT, LOCALHOST);

// create std in/out listeners for error handling
const pyProcess = new PyShell(`./server/chatterbot/chatterbot.py`, options);

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
  response: (message, callback) => {
    callcount = ++callcount % 3000;
    const Uid = callcount.toString();
    callbacks[Uid] = callback;
    const toSend = { id: Uid, message: message };
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
