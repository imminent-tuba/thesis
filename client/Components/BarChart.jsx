import React from 'react';
// import rd3 from 'react-d3';
import { PieChart } from 'react-d3';

export default class HeaderNavBar extends React.Component {
  constructor(props) {
    super(props);
    // this.props.getEmotions();
  }
  render() {
    this.props.getEmotions();
    const pieData = [
      { label: 'anger', value: this.props.emotions.anger * 100 },
      { label: 'disgust', value: this.props.emotions.disgust * 100 },
      { label: 'fear', value: this.props.emotions.fear * 100 },
      { label: 'joy', value: this.props.emotions.joy * 100 },
      { label: 'sadness', value: this.props.emotions.sadness * 100 },
    ];
    return (
      <PieChart
        data={pieData}
        width={400}
        height={400}
        radius={100}
        innerRadius={20}
        sectorBorderColor="white"
        title="Pie Chart"
      />
    );
  }
}
