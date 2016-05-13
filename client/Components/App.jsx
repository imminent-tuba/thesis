import React from 'react';
import Router from './Router.jsx';
import HeaderNavBar from './HeaderNavBar.jsx';
import IconButton from 'material-ui/lib/icon-button';

const App = () => (

    <div>
      <HeaderNavBar />
      <Router />
      <div style={{ width: '95%', padding:'24px', position: 'fixed', bottom : '0', clear: 'both', 'backgroundColor': '#00bcd4' }}>
        <div>
          <div style={{ color: 'white' }}>Copyright © 2016 - 2016 ChatterBot. All Rights Reserved.</div>
          
        </div>
      </div>
    </div>
);

export default App;
