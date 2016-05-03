import React from 'react';
// import rd3 from 'react-d3';
import { PieChart } from 'react-d3';

export default class HeaderNavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const pieData = [
      { label: 'Margarita', value: 20.0 },
      { label: 'John', value: 55.0 },
      { label: 'Tim', value: 25.0 },
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
