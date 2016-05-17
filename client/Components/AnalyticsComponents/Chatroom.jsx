import React from 'react';
import { render } from 'react-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import badWords from '../../resources/badWords.js';
import TextField from 'material-ui/lib/TextField';
import RaisedButton from 'material-ui/lib/raised-button';
import Avatar from 'material-ui/lib/avatar';

export default class Chatroom extends React.Component {

  componentDidUpdate() {
    document.getElementById('chatInput').focus();
    document.getElementById('chatInput').select();
  }

  isBadWord(phrase) {
    for (let i = 0; i < badWords.length; i++) {
      const rgx = new RegExp(badWords[i], 'gi');
      if (rgx.test(phrase)) {
        return true;
      }
    }
    return false;
  }

  _handleSubmitEvent(e) {
    e.preventDefault();
    const message = this.refs.currentInputMessage.getValue();

    if (message === '') {
      return;
    } else if (!this.isBadWord(message)) {
      this.props.sendChat(message);
    } else {
      this.props.reject();
    }
    this.refs.currentInputMessage.setValue('');

  }

  render() {
    const innerDivStyle = {
      bot: { align: 'right' },
      user: { align: 'left' },
    };

    return (
      <div style={{ pointerEvents: 'auto' }} >
        <div>
          <form onSubmit={this._handleSubmitEvent.bind(this)}>
            <TextField id="chatInput"
              hintText="Message"
              floatingLabelText="Message"
              type="text"
              ref='currentInputMessage'
            />

            <RaisedButton label="Send" secondary={true} type='submit' />
          </form>
        </div>
        <List>
          {this.props.chats.map( (val, idx) => {
            /* when user's message */
            if(val.user === 'user') {
              return (
                <ListItem
                  leftAvatar={
                    <Avatar
                      src='../../../user.ico'
                    />
                  }
                  primaryText={val.message}
                  style={innerDivStyle[val.id]}
                  key={idx}
                />
              );
            } else {
              /* when bot's message */
              return (
              <ListItem
                leftAvatar={
                  <Avatar
                    src='../../../favicon.ico'
                  />
                }
                primaryText={val.message}
                key={idx}
              />
              );
            }
          })}
        </List>
      </div>
    );
  }
}
