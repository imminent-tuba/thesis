import React from 'react';
import BarChart from './BarChart.jsx';


export default class D3View extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BarChart getEmotions={this.props.getEmotions} emotions={this.props.emotions} />
    );
  }
}
