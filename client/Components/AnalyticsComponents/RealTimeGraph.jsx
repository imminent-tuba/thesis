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
    console.log('before mod ', this.props.data.length);
    this.graph = graph(this.props.data);
    // this.graph.update(this.props.data);
    // this.graph.update(this.props.data);
    window.addEventListener('resize', this.chart.resize);
  };

  shouldComponentUpdate(nextProps) {
    this.graph.update(nextProps.data);
    return false;
  }





  render() {
    console.log(this.props.data);
    let style = {
      width: '80%',
      height: '100%',
      // 'background-color': 'black',
      'left': '300px',
      // margin: '0 auto';
      // position: 'absolute'
      // top : '200px'
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
