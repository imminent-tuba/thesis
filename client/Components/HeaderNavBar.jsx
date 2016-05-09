import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';

import AppBar from 'material-ui/lib/app-bar';

const labelStyle = {
  color: 'white',
};
const HeaderNavBar = () => (
  <AppBar title="Charles the Chatterbot" showMenuIconButton={false}>
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
  <div>
    <a href="https://slack.com/oauth/authorize?scope=incoming-webhook,commands,bot&client_id=11495581584.40629389573&redirect_uri=http://localhost:1337/auth/slack/callback"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"/></a>
  </div>
  </AppBar>
);

export default HeaderNavBar;
