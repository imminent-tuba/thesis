import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import EmotionBar from './EmotionBar.jsx';
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
    const chartSize = { width: '100%', height: '400px' };
    var data = this.handleEmotionData(this.props.data);
    console.log(data);
    barchart.create(this.d3Node, chartSize, data);
  }

  componentDidUpdate() {
    this.d3Node = this.refs.DOMnode;
    var data = this.handleEmotionData(this.props.data);
    console.log(data);
    barchart.update(this.d3Node, data);
  }

  handleEmotionData(object) {
    return Object.keys(object)
      .map((key, i) => {
        const emotion = key;
        // let i = 1;
        return { emotion: emotion, data: object[emotion], index: i };
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
