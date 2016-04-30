const stdin = process.openStdin();
const bot = require('./chatbotController.js');
const seinfeld1 = require('./seinfeld/seinfelds03e01.js');
const seinfeld2 = require('./seinfeld/seinfelds03e02.js');
const seinfeld3 = require('./seinfeld/seinfelds03e03.js');
const seinfeld4 = require('./seinfeld/seinfelds03e04.js');
const seinfeld5 = require('./seinfeld/seinfelds03e05.js');
const seinfeld6 = require('./seinfeld/seinfelds03e06.js');

stdin.addListener('data', d => {
  if (d.toString().trim() === 'train1') {
    bot.train(seinfeld1);
  } else if (d.toString().trim() === 'train2') {
    bot.train(seinfeld2);
  } else if (d.toString().trim() === 'train3') {
    bot.train(seinfeld3);
  } else if (d.toString().trim() === 'train4') {
    bot.train(seinfeld4);
  } else if (d.toString().trim() === 'train5') {
    bot.train(seinfeld5);
  } else if (d.toString().trim() === 'train6') {
    bot.train(seinfeld6);
  } else if (d.toString().trim() === 'init') {
    bot.init();
  } else {
    bot.response('terminal', d.toString().trim());
  }
});
