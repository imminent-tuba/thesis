import React from 'react';
import chart from './visualizations/bubbleChart.js';

export default class BubbleChart extends React.Component {
  constructor(props) {
    super();
  }

  componentWillMount() {
    this.props.getEmotions();
  }

  componentDidMount() {
    chart();
  }

  shouldComponentUpdate(nextProps) {
    // chart.newData(nextProps.data);
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
