import React from 'react';
import { PieChart } from 'rd3';

export default class EmotionPieChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let sumEmotions = 0;
    if (!Object.keys(this.props.data).length) {
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
        cx={(window.innerWidth-400)/2}
        cy={(window.innerHeight-200)/2}
        width={window.innerWidth}
        height={window.innerHeight-100}
        radius={150}
        innerRadius={40}
        colors={d3.scale.category20c()}
        sectorBorderColor="white"
        title={this.props.data.username}
      />
    );
  }
}

EmotionPieChart.propTypes = {
  data: React.PropTypes.object,
};
