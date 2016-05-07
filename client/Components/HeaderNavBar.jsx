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
  </AppBar>
);

export default HeaderNavBar;
