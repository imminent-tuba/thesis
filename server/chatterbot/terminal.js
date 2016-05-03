const stdin = process.openStdin();
const bot = require('./chatbotController.js');

stdin.addListener('data', d => {

  if (d.toString().trim() === 'init') {
    bot.init();
  } else {
    bot.response('terminal', d.toString().trim(), (err, msg) => {
      if (err) { console.log(err); } else { console.log(msg); }
    });
  }
});
