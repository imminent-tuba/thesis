import React from 'react';
import chart from './visualizations/bubbleChartv1.js';
// import d3 from 'd3';

export default class BubbleChart extends React.Component {
  constructor(props) {
    super();
  }

  componentWillMount() {
    this.props.getEmotions();
  }

  componentDidMount() {
    this.chart = chart();
  }

  shouldComponentUpdate(nextProps) {
    this.chart(nextProps.data);
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
  getEmotions: React.PropTypes.func,
};
