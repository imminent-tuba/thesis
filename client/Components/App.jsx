import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

/* React-tab-event-plugin */
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

/* Import Components */
import HeaderNavBar from './HeaderNavBar.jsx';
import DataViewList from './DataViewList.jsx';
import Chatroom from './Chatroom.jsx';
import D3View from './D3View.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      d3View: 'pie',
    };
  }

  handleDataViewListClick(view) {
    this.setState({ d3View: view });
  }

  render() {
    const methods = this.props.methods;
    return (
      <div>
        <HeaderNavBar />
        <Grid fluid>
          <Row>
            <Col md={3}>
              <DataViewList
                handleClick={this.handleDataViewListClick.bind(this)}
              />
            </Col>
            <Col md={5}>
              <D3View
                data={this.props.data}
                view={this.state.d3View}
                methods={this.props.methods}
              />
            </Col>
            <Col md={4}>
              <Chatroom
                sendChat={methods.sendChat.bind(this)}
                chats={this.props.chats}
                reject={methods.badWordReject.bind(this)}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  chats: React.PropTypes.array,
  methods: React.PropTypes.object,
  data: React.PropTypes.object,
};

export default App;
// https://www.npmjs.com/package/babel-plugin-add-module-exports
// bug with babel, on import need App.default in test until
// this module is implemented
// module.exports = App;
