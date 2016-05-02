import React from 'react';
import { render } from 'react-dom';
/* Material-ui Components */
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import LeftNav from 'material-ui/lib/left-nav';
import TextField from 'material-ui/lib/text-field';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

/*
this.props.chat [];
events: sendChat()
array: {user: '' , message: ''} user and Bot
// on submit => props => sendChat()

*/
export default class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    // this.setState({
    //   allChats: this.props,
    //
    // })
    // 1.redner all charts from this.props.chats
    // 2. databinding between chats and textarea
    //
  }
  render() {
    return (
      <div>
        <List>
          <ListItem primaryText="test" />
        </List>
        <div>
          <form onSubmit={this.props.sendChat}>
            <TextField
              fullwidth={true}
              type="text"
              floatingLabelText="Talk with the Bot!"
              value={this.props.chats}
            />
          <button> submit </button>
          </form>
        </div>
      </div>
    );
  }
}
