import d3 from 'd3';
import _ from 'lodash';

const barChart = {};
const margin = 60;
// data looks like this
// { emotion: emotion, data: object[emotion], index: i }
barChart.create = (el, props, data) => {
  console.log(el, 'svg inside create');
  // functions to grab specific parts of the data
  const emotion = d => d.emotion;
  // const yAxisMargin = {'margin-top': '25%'};
  const emotionsData = d => d.data;
  // const index = (d) => d.index;
  let svg = d3.select(el)
    .append('svg')
    .style('padding-top', '20%')
    .attr('id', 'barChart')
    .attr('width', props.width)
    .attr('height', props.height);
  // both x and y axes don't currently render

  let xScale = d3.scale.ordinal()
    .domain(data.map(d => d.emotion))
    .rangeRoundBands([100, 450], 0.1); // magic #40, width is a %
  /* [height, width], distance <> bars */
  // 
  let yScale = d3.scale.linear()
    .domain([0, d3.max(data, emotionsData)]) // ?
    .range([400 - margin, 0]); // height - margin, 300
  let xAxis = d3.svg.axis().scale(xScale);
  let yAxis = d3.svg.axis().scale(yScale).orient('left');

  d3.select('svg')
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(-5, ${400 - margin})`)
    .call(xAxis);
  d3.select('svg')
    .append('g')
    .attr('class', 'y-axis')
    .attr('transform', `translate(${margin + 41}, 0)`)
    .call(yAxis);
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.emotion))
    .attr('y', d => yScale(d.data))
    .attr('width', xScale.rangeBand())
    .attr('height', (d) => (yScale(0) - yScale(d.data)))
    .attr('fill', 'green');

  svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text((d) => d.emotion)
    .attr('text-anchor', 'middle')
    .attr('x', (d, i) => (xScale(i) + xScale.rangeBand() / 2))
    .attr('y', (d) => yScale(d.data))
    .attr('font-family', 'sans-serif')
    .attr('font-size', '11px')
    .attr('fill', 'black');
};

barChart.update = (el, props, data) => {
  const emotionsData = d => d.data;
  let xScale = d3.scale.ordinal()
    .domain(data.map(d => d.emotion))
    .rangeRoundBands([100, 450], 0.1); // magic #40, width is a %
      /* [height, width], distance <> bars */
  let yScale = d3.scale.linear()
    .domain([0, d3.max(data, emotionsData)]) // ?
    .range([400 - margin, 0]); // height - margin, 300
  let xAxis = d3.svg.axis().scale(xScale);
  let yAxis = d3.svg.axis().scale(yScale).orient('left');

  let svg = d3.select('#barChart');
  svg.selectAll('rect')
    .data(data)
    .transition()
    .duration(500)
    .attr('x', d => xScale(d.emotion))
    .attr('y', d => yScale(d.data))
    .attr('width', xScale.rangeBand())
    .attr('height', (d) => (yScale(0) - yScale(d.data)))
    .attr('text-anchor', 'middle')
    .attr('fill', 'green')
};

export default barChart;
