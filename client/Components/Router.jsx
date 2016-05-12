// export the router to be rendered at entry.jsx
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
// TODO: implement redirects
import AnalyticsSockets from './Analytics.Sockets.jsx';

import Admin from './Admin.jsx';
import About from './About.jsx';
import Home from './Home.jsx';

const RouterComponent = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/admin" component={Admin} />
    <Route path="/analytics" component={AnalyticsSockets} />
    <Route path="/about" component={About} />
  </Router>
);

export default RouterComponent;
