import React from 'react';
import chart from './visualizations/lineChart.js';
import example from '../../resources/exampleData.js';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default class TimeChart extends React.Component {
  constructor(props) {
    super();
    this.colors = {
      anger: '#DC143C',
      sadness: '#4169E1',
      fear: '#FFD700',
      disgust: '#7CFC00',
      joy: '#DA70D6',
    };
  }

  componentDidMount() {
    this.chart = chart();
    this.chart.update(example);
    window.addEventListener('resize', this.chart.resize);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.data) { this.chart.update(nextProps.data); }
    return false;
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col md={2}>
            <h4 style={{ color: this.colors.anger }}>Anger</h4>
            <h4 style={{ color: this.colors.sadness }}>Sadness</h4>
            <h4 style={{ color: this.colors.fear }}>Fear</h4>
            <h4 style={{ color: this.colors.disgust }}>Disgust</h4>
            <h4 style={{ color: this.colors.joy }}>Joy</h4>
          </Col>
          <Col md={10}>
            <div id="d3container"></div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

TimeChart.propTypes = {
  data: React.PropTypes.array,
};
