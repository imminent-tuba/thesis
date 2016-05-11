import React from 'react';
import Router from './Router.jsx';
import HeaderNavBar from './HeaderNavBar.jsx';

const App = () => (

    <div>
      <HeaderNavBar />
      <Router />
      <div style={{ width: '95%', padding:'24px', position: 'fixed', bottom : '0', clear: 'both', 'background-color': 'black' }}>
        
      </div>
    </div>
);

export default App;
