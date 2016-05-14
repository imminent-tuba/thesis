import React from 'react';
import chart from './visualizations/bubbleFinal.js';

export default class BubbleChart extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.chart = chart();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.data) {
      this.chart(nextProps.data);
    }
    return false;
  }

  render() {
    return (
      <div id="d3container"></div>
    );
  }
}

BubbleChart.propTypes = {
  data: React.PropTypes.object,
};
