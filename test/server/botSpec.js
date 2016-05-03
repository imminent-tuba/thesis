const bot = require('./server/chatterbot/chatbotController.js');

describe("the bot", function() {
  it("contains spec with an expectation", function() {
    bot.response('hello', (msg) => {
      expect(typeof msg).toBe('string');
    }) 
  });
});
