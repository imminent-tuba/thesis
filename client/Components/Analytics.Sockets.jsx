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
        taxonomy: [],
        keywords: [],
        // all data to generate graphs held in state here
        // state is passed down to app
        // to be passed down to d3View
      },
    };
    socket.on('message', (msg) => {
      const updateChat = this.state.chats.splice(0);
      updateChat.unshift({
        user: 'bot',
        message: msg,
      });
      this.setState({ chats: updateChat });
    });

    socket.on('populateGraph', data => {
      if (!data.emotions) {
        data.emotions = this.state.data.emotions;
      }
      if (!data.taxonomy) {
        data.taxonomy = this.state.data.taxonomy;
      }
      if (!data.keywords) {
        data.keywords = this.state.data.keywords;
      }
      this.setState({ data });
      console.log(data.emotionsTime);
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
      connect: () => {
        socket.emit('data');
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
