var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react/lib/ReactTestUtils');
var SocketWrapper = require('../Components/SocketWrapper.jsx').default;

describe('SocketWrapper', () => {
  it('renders without problems', () => {

    var socketWrapper = TestUtils.renderIntoDocument(<SocketWrapper />);
    var renderedApp = ReactDOM.findDOMNode(socketWrapper);
    expect(renderedApp.tagName).to.equal('DIV');
  });
});
