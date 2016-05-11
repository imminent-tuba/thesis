import React from 'react';
import barchart from './visualizations/barchart.js';

export default class EmotionBarChart extends React.Component {
  constructor(props) {
    super();
  }
  componentWillMount() {
    this.props.getEmotions();
  }
  componentDidMount() {
    this.d3Node = this.refs.DOMnode;
    const chartSize = { width: '100%', height: '500px' };
    const data = this.handleEmotionData(this.props.data);

    barchart.create(this.d3Node, chartSize, data);
  }

  shouldComponentUpdate(nextProps) {
    // reference to the SVG
    const el = this.d3Node.children[0];
    // console.log(el);
    const chartSize = { width: '100%', height: '400px' };
    const data = this.handleEmotionData(nextProps.data);
    barchart.update(el, chartSize, data);
    return false;
  }

  handleEmotionData(object) {
    return Object.keys(object)
      .map((key, i) => {
        if(key !== "username") {
          return { emotion: key, data: object[key], index: i };
        }
      })
      .filter((key, i) => {
        if(key !== undefined) {
          return { emotion: key, data: object[key], index: i };
        }
      });
  }

  render() {
    return (
      <div ref="DOMnode" className="bars" />
    );
  }
}

EmotionBarChart.propTypes = {
  data: React.PropTypes.object,
  getEmotions: React.PropTypes.func,
};
