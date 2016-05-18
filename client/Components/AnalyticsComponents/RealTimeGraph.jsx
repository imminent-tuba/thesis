import React from 'react';
import d3 from '../../../node_modules/d3/d3.v4.0.0-alpha.33.min.js';
// import RTChart from 'react-rt-chart';
import graph from './visualizations/RealTimeGraphD3.js';
// import epoch from '../../../node_modules/epoch-charting/dist/js/epoch.min.js';
// import $ from 'jquery';

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
    console.log(this.props.data);
    let style = {
      width: '700px',
      height: '500px',
      position: 'absolute',
      left:300
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
