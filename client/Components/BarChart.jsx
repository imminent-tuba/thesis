import React from 'react';
// import rd3 from 'react-d3';
import { PieChart } from 'react-d3';

export default class HeaderNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.props.getEmotions();
  }
  
  render() {
    const pieData = [
      { label: 'anger', value: Math.floor(this.props.emotions.anger * 100) },
      { label: 'disgust', value: Math.floor(this.props.emotions.disgust * 100) },
      { label: 'fear', value: Math.floor(this.props.emotions.fear * 100) },
      { label: 'joy', value: Math.floor(this.props.emotions.joy * 100) },
      { label: 'sadness', value: Math.floor(this.props.emotions.sadness * 100) },
    ];
    return (
      <PieChart
        data={pieData}
        width={800}
        height={800}
        radius={200}
        innerRadius={40}
        sectorBorderColor="white"
        title="Pie Chart"
      />
    );
  }
}
