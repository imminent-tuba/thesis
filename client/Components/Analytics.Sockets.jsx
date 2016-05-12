import React from 'react';
import Analytics from './AnalyticsComponents/Analytics.jsx';
import io from 'socket.io-client';
const socket = io();

export default class SocketWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      chats: [],
      data: {
        emotions: {},
        taxonomy: {},
        // all data to generate graphs held in state here
        // state is passed down to app
        // to be passed down to d3View
      },
    };
  }

  componentWillMount() {
    socket.on('message', (msg) => {
      const updateChat = this.state.chats.splice(0);
      updateChat.unshift({
        user: 'bot',
        message: msg,
      });
      this.setState({ chats: updateChat });
    });

    socket.on('populateGraph', data => {
      console.log('socket populateGraph ', data);
      this.setState({ data: {
        emotions: data.emotions,
        taxonomy: data.taxonomy,
      } });
    });
  }

  methods() {
    return {
      sendInfo: (userInfo) => {
        socket.emit('userInfo', userInfo);
      },
      sendChat: (msg) => {
        socket.emit('message', msg);
        const updateChat = this.state.chats.splice(0);
        updateChat.unshift({
          user: 'user',
          message: msg,
        });
        this.setState({ chats: updateChat });
      },
      badWordReject: () => {
        const updateChat = this.state.chats.splice(0);
        updateChat.unshift({
          user: 'bot',
          message: 'Don\'t be a troll please',
        });
        this.setState({ chats: updateChat });
      },
      // getEmotions is legacy?
      getEmotions: () => {
        socket.emit('emotions');
      },
    };
  }

  render() {
    return (
      <Analytics
        chats={this.state.chats}
        data={this.state.data}
        methods={this.methods()}
      />
    );
  }
}
