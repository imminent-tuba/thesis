// Make sure you have your directory and regex test set correctly!
const context = require.context('./tests', true, /.*Spec\.js$/);

require('core-js/es5');

context.keys().forEach(context);
module.exports = context;
