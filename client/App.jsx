import React from 'react';
import { render } from 'react-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { io } from 'socket.io-client/socket.io';
/* React-tab-event-plugin */
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

/* Import Components */
import HeaderNavBar from './Components/HeaderNavBar.jsx';
import DataViewList from './Components/DataViewList.jsx';
import Chatroom from './Components/Chatroom.jsx';
import D3View from './Components/D3View.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      emotions: {},
      d3View: 'pie',
    };

    socket.on('message', (msg) => {
      const updateChat = this.state.chats.splice(0);
      updateChat.unshift({
        user: 'bot',
        message: msg,
      });
      this.setState({ chats: updateChat });
    });

    socket.on('emotions', (emotions) => {
      this.setState({ emotions: emotions });
    });
  }

  sendChat(msg) {
    socket.emit('message', msg);
    let updateChat = this.state.chats.splice(0);
    updateChat.unshift({
      user: 'user',
      message: msg,
    });
    this.setState({ chats: updateChat });
  }

  handleDataViewListClick(view) {
    this.setState({ d3View: view });
  }

  badWordReject() {
    const updateChat = this.state.chats.splice(0);
    updateChat.unshift({
      user: 'bot',
      message: 'Don\'t be a troll please',
    });
    this.setState({ chats: updateChat });
  }

  render() {
    return (
      <div>
        <h1> FOO </h1>
        <HeaderNavBar />
        <Grid fluid>
          <Row>
            <Col md={3}>
              <DataViewList handleClick={this.handleDataViewListClick.bind(this)} />
            </Col>
            <Col md={5}>
              <D3View emotions={this.state.emotions} view={this.state.d3View} />
            </Col>
            <Col md={4}>
              <Chatroom sendChat={this.sendChat.bind(this)} chats={this.state.chats} reject={this.badWordReject.bind(this)} />
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
