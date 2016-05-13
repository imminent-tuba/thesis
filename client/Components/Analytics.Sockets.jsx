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

<<<<<<< 63ec5090aae78bdadf4195a24e96d6bd04cfbb99
    socket.on('populateGraph', data => {
      this.setState({ data: {
        emotions: data.emotions,
        taxonomy: data.taxonomy,
      } });
=======
    socket.on('emotions', (emotions) => {
      const state = { data : {} };
      state.data.emotions = emotions.emotions;
      state.data.taxonomy = emotions.taxonomy;
      // const state = this.state;
      // state.data.emotions = emotions.emotions;
      // state.data.taxonomy = emotions.taxonomy;
      this.setState(state);
>>>>>>> Style and Modify queries
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
