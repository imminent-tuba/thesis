const PyShell = require('python-shell');

const options = {
  mode: 'text',
  args: ['test'],
};

const pyProcess = new PyShell('./chatterbot.py', options);

var lastmsg;
pyProcess.on('message', message => {
  if (message !== lastmsg || message === 'training finished') {
    console.log(message);
    lastmsg = message;
  }
});

pyProcess.on('close', err => {
  if (err) { console.log('python error ', err); }
  else { console.log('python finished'); }
});

pyProcess.on('error', err => {
  if (err) { console.log('python error ', err); }
});

module.exports = {
  response: message => {
    pyProcess.send(message);
  },
  train: conversation => {
    conversation.unshift('xxstartxx');
    conversation.push('xxendxx');
    for (var i in conversation) {
      pyProcess.send(conversation[i]);
    }
  },
};
