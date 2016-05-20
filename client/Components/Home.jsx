import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardMedia from 'material-ui/lib/card/card-media';
import CardActions from 'material-ui/lib/card/card-actions';
import RaisedButton from 'material-ui/lib/raised-button';
import { Grid, Row, Col } from 'react-flexbox-grid';
import People from 'material-ui/lib/svg-icons/social/people';
import ChartIcon from './HomeComponents/ChartIcon.jsx';
import LaptopChromeBook from 'material-ui/lib/svg-icons/hardware/laptop-chromebook';
import Chat from 'material-ui/lib/svg-icons/communication/chat';
import $ from 'jquery';

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
  fontSize: '24px',
  paddingLeft: '15px',
  textShadow: '-1px -1px 1px #FFF, 1px -1px 1px #FFF, -1px 1px 1px #FFF, 1px 1px 1px #FFF',
  fontWeight: 'bold',
};
const button = {
  marginLeft: '30px',
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
                      <Row>
                        <CardActions>
                          <RaisedButton
                            style={button}
                            label="See it in action!"
                            linkButton={true}
                            href="#analytics"
                            backgroundColor="green"
                          />
                        </CardActions>
                      </Row>
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
        <CardText>
          <Row>
            <h2>Be proactive with keeping your team happy</h2>
          </Row>
          <Row>
            <h2>Promote healthy work culture through accountability</h2>
          </Row>
          <Row>
            <h2>Never miss deadlines again because of interpersonal issues</h2>
          </Row>
          <Row>
            <p>Place a chatbot into your team’s Slack channel to train it with your team’s conversations.</p>
            <p>See the data visualizations change in real time based on the conversations happening!</p>
            <p>Learn insights about the sentiment of your team, and later talk to the Chatbot to see what things it has learned!</p>
          </Row>
        </CardText>
      </Grid>
    </Card>
  </div>
);

export default Home;
