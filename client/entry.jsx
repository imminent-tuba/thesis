import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import SocketWrapper from './Components/SocketWrapper.jsx';

render(<SocketWrapper />, document.getElementById('app'));
