import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import {Tabs, Tab} from 'material-ui/lib/tabs';
import FontIcon from 'material-ui/lib/font-icon';
import MapsPersonPin from 'material-ui/lib/svg-icons/maps/person-pin';

const labelStyle = {
  color: 'white',
  fontSize: 20,
};

const divStyle = {
  'margin-top': 8,
};

// // <a href="https://slack.com/oauth/authorize?scope=incoming-webhook,commands,bot&client_id=11495581584.40629389573&redirect_uri=http://uai.website/auth/slack/callback"><img alt="Add to Slack" height="35" width="130" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"/></a>

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
    <FlatButton
      href="/auth/slack"
      linkButton={true}
      label="Login"
      labelStyle={labelStyle}
      icon={<img alt="Add to Slack" height="27" width="25" src="https://upload.wikimedia.org/wikipedia/en/7/76/Slack_Icon.png" />}
    />
  </div>
);
const HeaderNavBar = () => (
  <AppBar title="Charles the Chatterbot" showMenuIconButton={false}
    iconElementRight={myTabs}
  />
);

export default HeaderNavBar;
