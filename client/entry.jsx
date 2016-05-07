import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
// import SocketWrapper from './Components/SocketWrapper.jsx';
// import RouterComponent from './Components/Router.jsx';
import App from './Components/App.jsx';

// render(<SocketWrapper />, document.getElementById('app'));
render(<App />, document.getElementById('app'));

// render the router here
