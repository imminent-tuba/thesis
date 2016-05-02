import React from 'react';
import { render } from 'react-dom';
/* Material-ui Components */
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import LeftNav from 'material-ui/lib/left-nav';
import TextField from 'material-ui/lib/text-field';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

export default class Chatroom extends React.Component {
  render() {
    return (
      <div>
        <List>
          <ListItem primaryText="test" />
        </List>
        <TextField
          fullwidth={true}
          type="text"
          floatingLabelText="Talk with the Bot!"
        />
      </div>
    );
  }
}
