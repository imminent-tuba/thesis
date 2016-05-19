import React from 'react';
import d3 from '../../resources/d3.v4.0.0-alpha.33.min.js';
import graph from './visualizations/RealTimeGraphD3.js';

export default class RealTimeGraph extends React.Component {
  constructor(props) {
    super();
  };

  componentDidMount() {
    this.graph = graph(this.props.data);
    window.addEventListener('resize', this.chart.resize);
  };

  shouldComponentUpdate(nextProps) {
    this.graph.update(nextProps.data);
    return false;
  }

  render() {
    let style = {
      width: '80%',
      height: '100%',
      'left': '300px',
    }
    return (
      <div>
        <canvas id='graph' style={style}>
          {this.graph}
        </canvas>
      </div>
    );
  }
}
