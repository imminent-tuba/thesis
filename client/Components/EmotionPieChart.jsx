import React from 'react';
import { PieChart } from 'rd3';

export default class EmotionPieChart extends React.Component {
  constructor(props) {
    super(props);
    // this.props.getEmotions(); // on componentWillMount?
  }
  componentWillMount() {
    socket.emit('emotions');
  }

  render() {
    if (!this.props.data.anger) {
      return <div></div>;
    }
    const pieData = [
      { label: 'anger', value: Math.floor(this.props.data.anger * 100) },
      { label: 'disgust', value: Math.floor(this.props.data.disgust * 100) },
      { label: 'fear', value: Math.floor(this.props.data.fear * 100) },
      { label: 'joy', value: Math.floor(this.props.data.joy * 100) },
      { label: 'sadness', value: Math.floor(this.props.data.sadness * 100) },
    ];
    return (
      <PieChart
        data={pieData}
        width={300}
        height={300}
        radius={100}
        innerRadius={20}
        sectorBorderColor="white"
        title="Pie Chart"
      />
    );
  }
}
