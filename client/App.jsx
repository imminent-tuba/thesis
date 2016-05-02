import React from 'react';
import { render } from 'react-dom';
import  { Grid, Row, Col } from 'react-flexbox-grid';


/* React-tab-event-plugin */
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
/* React-tab-event-plugin */

/* Import Components */
import HeaderNavBar from './Components/HeaderNavBar.jsx';
import Chatroom from './Components/Chatroom.jsx';

const App = () => (
  <div>
    <HeaderNavBar />
    <Grid fluid>
      <Row>
        <Col xs={6}>
          <Chatroom />
        </Col>
      </Row>
    </Grid>
  </div>
);

render(<App />, document.getElementById('app'));
