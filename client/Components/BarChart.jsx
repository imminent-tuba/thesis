import React from 'react';

export default class BarChart extends React.Component {
  render() {
    if (!this.props.emotions.anger) {
      return <div></div>;
    }
    var sumEmotions = 0;
    for (var key in this.props.emotions) {
      sumEmotions += this.props.emotions[key];
    }
    console.log(sumEmotions);
    const pieData = [
      { label: 'anger', value: (this.props.emotions.anger * 100 / sumEmotions).toFixed(2) },
      { label: 'disgust', value: (this.props.emotions.disgust * 100 / sumEmotions).toFixed(2) },
      { label: 'fear', value: (this.props.emotions.fear * 100 / sumEmotions).toFixed(2) },
      { label: 'joy', value: (this.props.emotions.joy * 100 / sumEmotions).toFixed(2) },
      { label: 'sadness', value: (this.props.emotions.sadness * 100 / sumEmotions).toFixed(2) },
    ];
    return (
      <PieChart
        data={pieData}
        width={500}
        height={500}
        radius={200}
        innerRadius={20}
        sectorBorderColor="white"
        title="Pie Chart"
      />
    );
  }
}
