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
  constructor(props) {
    super(props);
  }

  _handleSubmitEvent(e) {
    e.preventDefault();
    let message = this.refs.currentInputMessage.value;
    // message = message.value;
    console.log(message);
    this.props.sendChat(message);
  }

  render() {
    return (
      <div>
        <List>
          {this.props.chats.map( (val, idx) => {
            console.log(val.message);
            return <ListItem primaryText={val.message} key={idx}/>
          })}

        </List>
        <div>
          <form onSubmit={this._handleSubmitEvent.bind(this)}>
            <input
              type="text"
              ref='currentInputMessage'
            />
            <button type='submit'> submit </button>
          </form>
        </div>
      </div>
    );
  }

}
