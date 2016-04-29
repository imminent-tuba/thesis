module.exports = message => {
  if (message.id === 'terminal') {
    console.log('bot says :', message.message);
  }
};
