import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import { Grid, Row, Col } from 'react-flexbox-grid';
import People from 'material-ui/lib/svg-icons/social/people';
import ChartIcon from './HomeComponents/ChartIcon.jsx';
import LaptopChromeBook from 'material-ui/lib/svg-icons/hardware/laptop-chromebook';
import SlackIcon from './HomeComponents/SlackIcon.jsx';
import Chat from 'material-ui/lib/svg-icons/communication/chat';

const containerSyle = {
  background: 'rgba("0, 0, 0, 0")',
  position: 'relative',
  top: 0,
  left: 0,
};
const style = {
  fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif',
  fontSize: '54px',
};
const subtitle = {
  fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif',
  fontSize: '28px',
};
const info = {
  fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif',
  fontSize: '18px',
};

const Home = () => (
  <div>
    <Card>
      <Grid>
        <Row>
          <Col md={12}>
            <CardMedia
              overlayContentStyle={containerSyle}
              overlay={
                <div>
                  <Row>
                    <img
                      width="250"
                      height="250"
                      src="../assets/bot.svg"
                    />
                    <div>
                      <h1 style={style}>Charlie The Chatterbot</h1>
                      <h3 style={subtitle}>Sentiment Analysis Visualization Platform for Slack</h3>
                    </div>
                  </Row>
                  <Row style={info}>
                    <Col>
                      <div>
                        <h2>Sentiment Analysis <span><People /></span></h2>
                        <p>Leveraging AlchemyAPI Sentiment Analysis</p>
                        
                      </div>
                      <div>
                        <h2>Visual Team Analytics <span><ChartIcon /></span></h2>
                        <p>Live graphical display of your team</p>
                      </div>
                      <div>
                        <h2>Machine Learning <span><LaptopChromeBook /></span></h2>
                        <p>Your teams conversations train a bot.</p>
                      </div>
                      <div>
                        <h2>Slack Integration <span><Chat /></span></h2>
                        <p>Integrate our platform into Slack Channels</p>
                      </div>
                    </Col>
                  </Row>
                </div>
              }
            >
              <img src="../assets/roundtable.jpg" />
            </CardMedia>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h2>Sentiment Analysis</h2>
            <p>Leveraging AlchemyAPI Sentiment Analysis</p>
            <People />
          </Col>
          <Col md={6}>
            <h2>Visual Team Analytics</h2>
            <p>Live graphical display of your team</p>
            <ChartIcon />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h2>Machine Learning</h2>
            <p>Your teams conversations train a bot.</p>
            <LaptopChromeBook />
          </Col>
          <Col md={6}>
            <h2>Slack Integration</h2>
            <p>Integrate our platform into Slack Channels</p>
            <Chat />
          </Col>
        </Row>
      </Grid>
    </Card>
  </div>
);

export default Home;
