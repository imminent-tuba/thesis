import React from 'react';
import chart from './visualizations/bubbleChartv1.js';

export default class BubbleChart extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.chart = chart();
    this.chart(this.props.data);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.data) { this.chart(nextProps.data); }
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
