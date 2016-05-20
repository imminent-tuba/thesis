import React from 'react';
import graph from './visualizations/RealTimeGraphD3.js';

export default class RealTimeGraph extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.graph = graph(this.props.data);
  }

  shouldComponentUpdate(nextProps) {
    this.graph.update(nextProps.data);
    return false;
  }

  render() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    return (
      <div>
        <canvas id="graph" width={width} height={height} >
          {this.graph}
        </canvas>
      </div>
    );
  }
}

RealTimeGraph.propTypes = {
  data: React.PropTypes.object,
};
