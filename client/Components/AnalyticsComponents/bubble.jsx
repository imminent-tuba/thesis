import React from 'react';
import chart from './visualizations/BubbleFinal.js';

export default class BubbleChart extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.chart = chart();
    this.chart.update(this.props.data);
    window.addEventListener('resize', this.chart.resize);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.data) { this.chart.update(nextProps.data); }
    return false;
  }

  render() {
    return (
      <div id="d3container"></div>
    );
  }
}

BubbleChart.propTypes = {
  data: React.PropTypes.array,
};