import d3 from 'd3';
import _ from 'lodash';

const barChart = {};

barChart.create = (el, props, data) => {
  const y = d3.scale.linear()
    .range(['0px', '400px']);
  const scores = _.map(data, 'data');

  y.domain([0, d3.max(scores, (d) => d)]);
  const barWidth = 400 / scores.length;

  const svg = d3.select(el).append('svg')
    .attr('class', 'barChart')
    .attr('width', props.width)
    .attr('height', props.height);

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('height', (d) => `${100 - (d.data * 200)}px`)
    .attr('width', () => `${barWidth}px`)
    .attr('x', (d) => `${d.index * barWidth}px`)
    .attr('y', () => `${100}px`)
    .attr('class', 'rect')
    .style('fill', () => 'green');
};

barChart.update = (el, data) => {
  const svg = d3.select(el).select('svg');
  const bars = svg.selectAll('.rect')
    .data(data);
  // bars
  //   .enter()
  //   .append('rect')
  //   .attr('class', 'rect')
  //   .attr('height', (d) => `${d.data * 100}px`)
  //   .attr('y', (d) => `${d.data * 10000}px`);

  bars
    .exit()
    .remove();
};

export default barChart;
