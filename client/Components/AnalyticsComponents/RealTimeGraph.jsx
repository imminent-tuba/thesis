import React from 'react';
import d3 from 'd3';
// import RTChart from 'react-rt-chart';
// import graph from './visualizations/RealTimeGraphD3.js';
// import epoch from '../../../node_modules/epoch-charting/dist/js/epoch.min.js';
// import $ from 'jquery';

export default class RealTimeGraph extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    console.log('foo');

  }

  // shouldComponentUpdate(/*nextProps*/) {
  //   // if (nextProps.data) {
  //   //   this.chart(nextProps.data);
  //   // }
  //   // return false;
  // }

  render() {
    const style = {
      width: '960',
      height: '960',
    };

    const canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        width = canvas.width,
        height = canvas.height;

    const n = 400,
        pi = Math.PI,
        tau = 2 * pi;

    const nodes = d3.range(n).map(function() {
      const r = Math.random() * width / 3,
          a = Math.random() * tau,
          x = width / 2 + r * Math.cos(a),
          y = height / 2 + r * Math.sin(a);
      return {
        x: x,
        y: y,
        vx: (height / 2 - y) * 0.006,
        vy: (x - width / 2) * 0.006
      };
    });

    const force = d3.forceSimulation(nodes)
        .drag(0)
        .alphaDecay(0)
        .force("charge", d3.forceManyBody().strength(0.02))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);

    const stroke = d3.scaleLinear()
        .domain([0, 10])
        .range(["magenta", "yellow"]);

    function ticked() {
      context.clearRect(0, 0, width, height);
      context.lineWidth = 4;
      context.lineCap = "square";

      for (let i = 0, node, vx, vy; i < n; ++i) {
        node = nodes[i];
        context.beginPath();
        context.moveTo(node.x, node.y);
        context.lineTo(node.x + node.vx * 3, node.y + node.vy * 3);
        context.strokeStyle = stroke(node.vx * node.vx + node.vy * node.vy);
        context.stroke();
      }
    }

    return (
      <div id="graph">
        <canvas style={style}>{canvas}</canvas>
      </div>
    )
  }
}
