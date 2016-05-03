'user strict';

import React from 'react/addons';
import App from '../../client/Components/App';

const TestUtils = React.addons.TestUtils;

describe('App', () => {
/*
  beforeEAch(() => {
    component = TestUtils.renderIntoDocument(<App >);
  });
*/
  it("should render HEADER NAV BAR", () => {
    const component = TestUtils.renderIntoDocument( <App /> );
    const HeadNavBar = TestUtils.findREnderedDOMComponentWithTag(
      component, 'HeadNavBar'
    );

    expect(HeadNavBar.getDOMNode().textContent)
      .toEqual('Title');
  });
});
