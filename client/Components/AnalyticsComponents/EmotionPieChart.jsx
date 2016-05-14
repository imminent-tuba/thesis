import React from 'react';
import { PieChart } from 'rd3';

export default class EmotionPieChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let sumEmotions = 0;
    if (!this.props.data.anger) {
      return (<div></div>);
    } else {
      for (let key in this.props.data) {
        if(key === 'username') continue;
        sumEmotions += this.props.data[key];
      }
    }
    const pieData = [
      { label: 'anger', value: (this.props.data.anger * 100 / sumEmotions).toFixed(2) },
      { label: 'disgust', value: (this.props.data.disgust * 100 / sumEmotions).toFixed(2) },
      { label: 'fear', value: (this.props.data.fear * 100 / sumEmotions).toFixed(2) },
      { label: 'joy', value: (this.props.data.joy * 100 / sumEmotions).toFixed(2) },
      { label: 'sadness', value: (this.props.data.sadness * 100 / sumEmotions).toFixed(2) },
    ];
    return (
      <PieChart
        data={pieData}
        width={window.innerWidth * 0.8}
        height={300}
        radius={100}
        innerRadius={20}
        sectorBorderColor="white"
        title={this.props.data.username}
      />
    );
  }
}

EmotionPieChart.propTypes = {
  data: React.PropTypes.object,
};
