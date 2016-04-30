import React from 'react';

/* MUI lib files */
import AppBar from 'material-ui/AppBar/AppBar';
import IconButton from 'material-ui/IconButton/IconButton';
import Avatar from 'material-ui/Avatar/Avatar';
import IconMenu from 'material-ui/'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem/MenuItem';

export default class HeaderNavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <AppBar
    title="Title"
    iconElementLeft={
      <IconButton>
        <Avatar
          src='https://lh5.ggpht.com/0WtsR4_NKcbftR5KvnlQ9YYpkBsfglEKhsvBbe-PSOgWkuDWIw2DIUnkmbuWy7DYFQ=w300-rw'
          backgroundColor='Color.1A237E'
          />
      </IconButton>}
    iconElementRight={
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    }
  />
    )
  }
}
