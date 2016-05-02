import React from 'react';
import { render } from 'react-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
/* React-tab-event-plugin */
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

/* Import Components */
import HeaderNavBar from './Components/HeaderNavBar.jsx';
import DataViewList from './Components/DataViewList.jsx';
import Chatroom from './Components/Chatroom.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
    };
    socket.on('message', (msg) => {
      const updateChat = this.state.chats.splice(0);
      updateChat.push({
        user: 'bot',
        message: msg,
      });
      this.setState({ chats: updateChat });
    });
  }

  sendChat(msg) {
    socket.emit('message', msg);
    let updateChat = this.state.chats.splice(0);
    updateChat.push({
      user: 'user',
      message: msg,
    });
    this.setState({ chats: updateChat });
  }

  render() {
    return (
      <div>
        <HeaderNavBar />
        <Grid fluid>
          <Row>
            <Col md={3}>
              <DataViewList />
            </Col>
            <Col md={6}>
              <p> D3 Charts Go here </p>
            </Col>
            <Col md={3}>
              <Chatroom sendChat={this.sendChat.bind(this)} chats={this.state.chats} />
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
