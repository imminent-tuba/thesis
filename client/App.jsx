import React from 'react';
import { render } from 'react-dom';

/* Material Design module*/
// import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
// import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
/* End of Material Design module */

/* React-tab-event-plugin */
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
/* React-tab-event-plugin */

/* Import Components */
import HeaderNavBar from './Components/HeaderNavBar.jsx';
import SideNavBar from './Components/SideNavBar.jsx';

var App = () => (
  // render ()(

    <div>
      <HeaderNavBar />
      <SideNavBar />
      <Body />
    </div>

  // )
);

render(<App />, document.getElementById('app'));
