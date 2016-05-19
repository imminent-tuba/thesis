import React from 'react';
import graph from './visualizations/RealTimeGraphD3.js';

export default class RealTimeGraph extends React.Component {
  constructor(props) {
    super();
  };

  componentDidMount() {
    this.graph = graph(this.props.data);
    // this.graph.update(this.props.data);
    window.addEventListener('resize', this.chart.resize);
  }


  render() {
    let style = {
      width: '700px',
      height: '500px',
      position: 'absolute',
      left: 300,
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
