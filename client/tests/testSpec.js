'user strict';

var ReactTestUtils = require('react/addons');
var App = require('../App.jsx');

const TestUtils = React.addons.TestUtils;

describe('App', () => {
/*
  beforeEAch(() => {
    component = TestUtils.renderIntoDocument(<App >);
  });
*/
  it("should render HEADER NAV BAR", () => {
    const component = TestUtils.renderIntoDocument( <App /> );
    const h1 = TestUtils.findRenderedDOMComponentWithTag(
      'h1'
    );

    expect(h1.getDOMNode().textContent)
      .toEqual('Foo');
  });
});

// var React = require('react');
// var TestUtils = require('react/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
//
// var App = require('../App.jsx'); //my app-test lives in components/__tests__/, so this is how I require in my components.
//
// describe('app', function () {
//   it('renders without problems', function () {
//     var app = TestUtils.renderIntoDocument(<App/>);
//     expect(app).toExist();
//   });
// });
