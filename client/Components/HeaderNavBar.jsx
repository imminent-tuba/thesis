import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';

import AppBar from 'material-ui/lib/app-bar';

<<<<<<< aa3fc511bbaf7c3592c83bf20a41611f1ee1d8d6
=======
export default class HeaderNavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  // _handleLoginClick () {
  //   e.preventDefault();
  //
  // }
  render() {
    const style = {
      margin: 12,
    };
    return (
      <AppBar
    title="Title"
>>>>>>> Add Slack authenication

const labelStyle = {
  color: 'white',
};

<<<<<<< aa3fc511bbaf7c3592c83bf20a41611f1ee1d8d6
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
  </AppBar>
);

export default HeaderNavBar;
=======
    iconElementRight={
      <div>
        <a href="https://slack.com/oauth/authorize?scope=incoming-webhook&client_id=11495581584.40629389573">
          <img alt="Add to Slack" height="40" width="139"
            src="https://platform.slack-edge.com/img/add_to_slack.png"
            srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
        </a>
        <RaisedButton label="Signup" primary={true} style={style} />
        <RaisedButton label="Login" href="oauth/authorize/callback" primary={true} style={style} />
        <RaisedButton label="Logout" primary={true} style={style} />
      </div>
    }
  />
    )
  }
}
{/*<form onSubmit={(e) => e.preventDefault()}>
  <TextField
    hintText="Username"
    value={this.state.username}
    onChange={this.onUsernameChange}
  ><br />
  <TextField
    hintText="Password"
    type="password"
    value={this.state.password}
    onChange={this.onPasswordChange}
  ><br />
  <RaisedButton
    type="submit"
    label="Sign Up"
    onClick={this.onSignupSubmit}
  >
</form>*/}
>>>>>>> Add Slack authenication
