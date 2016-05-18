import React from 'react';
import { render } from 'react-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import badWords from '../../resources/badWords.js';
import TextField from 'material-ui/lib/TextField';
import RaisedButton from 'material-ui/lib/raised-button';
import Avatar from 'material-ui/lib/avatar';

import DataViewList from './DataViewList.jsx';

export default class Chatroom extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !(nextProps.chats.length === this.props.chats.length);
  }

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
  handleEnterPress() {
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
      <DataViewList handleClick={this.props.handleClick}/>

        <div>
          <form onSubmit={this._handleSubmitEvent.bind(this)}>
            <TextField id="chatInput"
              multiLine={true}
              floatingLabelText="Message"
              type="text"
              ref="currentInputMessage"
              onKeyDown={(e) => { if (e.keyCode === 13) { e.preventDefault(); this.handleEnterPress(); } }}
            />

            <RaisedButton label="Send" secondary={true} type="submit" />
          </form>
        </div>
        <List>
          {this.props.chats.map((val, idx) => {
            let avatar = val.user === 'user' ? '../../../user.ico' : '../../../favicon.ico';
            return (
              <ListItem
                leftAvatar={
                  <Avatar
                    src={avatar}
                  />
                }
                primaryText={val.message}
                style={innerDivStyle[val.id]}
                key={idx}
              />
            );
          })}
        </List>
      </div>
    );
  }
}
