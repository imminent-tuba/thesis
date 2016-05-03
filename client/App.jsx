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

  render() {
    return (
      <div>
        <HeaderNavBar />
        <Grid fluid>
          <Row>
            <Col md={3}>
              <DataViewList handleClick={this.handleDataViewListClick.bind(this)} />
            </Col>
            <Col md={6}>
              <D3View emotions={this.state.emotions} view={this.state.d3View} />
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
