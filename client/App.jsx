import React from 'react';
import { render } from 'react-dom';

/* Material Design module*/
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
/* End of Material Design module */

/* React-tab-event-plugin */
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
/* React-tab-event-plugin */

/* Import Components */
import HeaderNavBar from './Components/HeaderNavBar.jsx';
// import HeaderNavBar from './Components/';

var App = () => (
  // render ()(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <HeaderNavBar />
  </MuiThemeProvider>
  // )
);

render(<App />, document.getElementById('app'));
