import React from 'react';
import { render } from 'react-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
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
    this.refs.currentInputMessage.value = '';
  }

  render() {
    let innerDivStyle = {
      align: 'right'
    }

    return (
      <div>
        <List>
          {this.props.chats.map( (val, idx) => {
            /* when user's message */
            if(val.user === 'user') {
              return (
                <Col md={6} key={idx}>
                    <ListItem primaryText={val.message} />
                </Col>
              )
            } else {
              /* when bot's message */
              return (
                <Col md={6} key={idx}>
                    <ListItem primaryText={val.message} key={idx}/>
                </Col>
              )
            }
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
