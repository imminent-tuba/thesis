var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react/lib/ReactTestUtils');
var App = require('../App.jsx').default;

describe('App', () => {
  console.log(App);
  it('renders without problems', () => {
    var app = TestUtils.renderIntoDocument(<App />);
    var renderedApp = ReactDOM.findDOMNode(app);
    expect(renderedApp.tagName).to.equal('DIV');
  });
});
