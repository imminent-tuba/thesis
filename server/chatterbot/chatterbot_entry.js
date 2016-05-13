const PyShell = require('python-shell');
const pySettings = require('../config/pythonSettings.js');
const logger = require('../logger.js');

// create std in/out listeners for error handling
const pyProcess = new PyShell('./server/chatterbot/chatterbot.py', pySettings);

pyProcess.on('message', message => {
  logger.log('info', 'From Python chatterbot ', message);
});

pyProcess.on('close', err => {
  if (err) { logger.log('error', 'python close error ', err); }
  else { logger.log('error', 'python closed'); }
});

pyProcess.on('error', err => {
  if (err) { logger.log('error', 'python error ', err); }
});
