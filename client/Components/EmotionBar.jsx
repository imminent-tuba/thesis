import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

// this.props.data = {emotion: emotion, number: [0-1]}

export default class EmotionBar extends React.Component {
  componentDidMount() {
    console.log('data inside emotionbar', this.props.data);
    const d3Node = this.refs.DOMnode;
  }
  componentDidUpdate() {
    this.d3Node.datum(this.props.data);
  }
  render() {
    return (
      <rect ref="DOMnode" className="emotionBar" />
    );
  }
}

EmotionBar.PropTypes = {
  data: React.PropTypes.object,
};
