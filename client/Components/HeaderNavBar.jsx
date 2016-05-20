import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';

import AppBar from 'material-ui/lib/app-bar';
// import IconButton from 'material-ui/lib/icon-button';
// import IconMenu from 'material-ui/lib/menus/icon-menu';
// import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
// import MenuItem from 'material-ui/lib/menus/menu-item';
// import {Tabs, Tab} from 'material-ui/lib/tabs';
// import FontIcon from 'material-ui/lib/font-icon';
// import MapsPersonPin from 'material-ui/lib/svg-icons/maps/person-pin';

// import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';

// import DataViewList from './AnalyticsComponents/DataViewList.jsx';

const labelStyle = {
  color: 'white',
  fontSize: 20,
};

const divStyle = {
  'margin-top': 8,
};

const myTabs = (
  <div style={divStyle}>
    
    <FlatButton
      href="#analytics"
      linkButton={true}
      label="Analytics"
      labelStyle={labelStyle}
    />

    <FlatButton
      href="#"
      linkButton={true}
      label="Home"
      labelStyle={labelStyle}
    />
    <FlatButton
      href="#about"
      linkButton={true}
      label="About"
      labelStyle={labelStyle}
    />
  </div>
);
const HeaderNavBar = () => (
  <AppBar title="Charles the Chatterbot" showMenuIconButton={false}
    iconElementRight={myTabs}
  />
);

export default HeaderNavBar;

    // <FlatButton
    //   href="/auth/slack"
    //   linkButton={true}
    //   label="Login"
    //   labelStyle={labelStyle}
    //   icon={<img alt="Add to Slack" height="27" width="25" src="https://upload.wikimedia.org/wikipedia/en/7/76/Slack_Icon.png" />}
    // />
