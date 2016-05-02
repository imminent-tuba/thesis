import React from 'react';
import { render } from 'react-dom';
import  { Grid, Row, Col } from 'react-flexbox-grid';
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
import DataViewList from './Components/DataViewList.jsx';
import Chatroom from './Components/Chatroom.jsx';

var App = () => (
  <div>
    <HeaderNavBar />
    <Grid fluid>
      <Row>
        <Col md={3}>
          <DataViewList />
        </Col>
        <Col md={6}>
          <p> FOO </p>
        </Col>
        <Col md={3}>
          <Chatroom />
        </Col>
      </Row>

    </Grid>
  </div>
);

render(<App />, document.getElementById('app'));
