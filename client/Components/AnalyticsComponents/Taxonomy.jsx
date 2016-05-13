import React from 'react';
import chart from './visualizations/taxChart.js';

export default class Taxonomy extends React.Component {
  constructor(props) {
    super(props);
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

Taxonomy.propTypes = {
  data: React.PropTypes.array,
};
