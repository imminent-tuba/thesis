import React from 'react';
import { render } from 'react-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import badWords from '../badWords.js';


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
    let message = this.refs.currentInputMessage.value;

    this.props.sendChat(message);
    this.refs.currentInputMessage.value = '';
  }

  render() {
    const innerDivStyle = {
      bot: { align: 'right' },
      user: { align: 'left' },
    };

    return (
      <div>
        <div>
          <form onSubmit={this._handleSubmitEvent.bind(this)}>
            <input id="chatInput"
              type="text"
              ref='currentInputMessage'
            />
            <button type='submit'> submit </button>
          </form>
        </div>
        <List>
          {this.props.chats.map( (val, idx) => {
            /* when user's message */
            if(val.user === 'user') {
              return (
                <Col md={6} key={idx}>
                  <ListItem primaryText={val.message} style={innerDivStyle[val.id]} />
                </Col>
              );
            } else {
              /* when bot's message */
              return (
                <Col md={6} key={idx}>
                  <ListItem primaryText={val.message} key={idx}/>
                </Col>
              );
            }
          })}
        </List>
      </div>
    );
  }
}
