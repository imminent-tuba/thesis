import React from 'react';
import barchart from './visualizations/barchart.js';

export default class EmotionBarChart extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    const data = this.handleEmotionData(this.props.data);
    this.chart = barchart();
    this.chart.update(data);
    window.addEventListener('resize', this.chart.resize);
  }

  shouldComponentUpdate(nextProps) {
    const data = this.handleEmotionData(nextProps.data);
    this.chart.update(data);
    return false;
  }

  handleEmotionData(object) {
    return Object.keys(object)
      .map((key, i) => {
        if(key !== "username") {
          return { emotion: key, data: object[key], index: i };
        }
      })
      .filter((key, i) => {
        if(key !== undefined) {
          return { emotion: key, data: object[key], index: i };
        }
      });
  }

  render() {
    return (
      <div id="bars" />
    );
  }
}

EmotionBarChart.propTypes = {
  data: React.PropTypes.object,
  getEmotions: React.PropTypes.func,
};
