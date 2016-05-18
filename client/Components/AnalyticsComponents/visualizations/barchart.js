/*use 'esversion:6'*/

import d3 from 'd3';
import _ from 'lodash';

let saveData = [];
// data looks like this
// { emotion: emotion, data: object[emotion], index: i }
export default () => {
  const getData = d => d.data;
  let width = window.innerWidth;
  let height = window.innerHeight;

  const svg = d3.select('#bars')
    .append('svg')
    .style('padding-top', '20%')
    .attr('id', 'barChart')
    .attr('width', width)
    .attr('height', height);

  const update = (data) => {
    saveData = data;
    const xScale = d3.scale.ordinal()
      .domain(data.map(d => d.emotion))
      .rangeRoundBands([0, 450], 0.1); // magic #40, width is a %
        /* [height, width], distance <> bars */
    const yScale = d3.scale.linear()
      .domain([0, d3.max(data, getData)]) // ?
      .range([height, 0]); // height - margin, 300
    const xAxis = d3.svg.axis().scale(xScale);
    const yAxis = d3.svg.axis().scale(yScale).orient('left');

    d3.select('svg')
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${(width / 3) - 200}, 200)`)
      // (window.width / 2) + (width of x axis / 2)
      .call(xAxis);

    d3.select('svg')
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${(width / 3) - 200}, -400)`)
      .call(yAxis);

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.emotion) + (width / 3 - 200))
      // .attr('x', d => xScale(d.emotion))
      .attr('y', d => yScale(d.data))
      // .attr('y', d => yScale(d.data))
      .attr('width', xScale.rangeBand())
      .attr('height', d => (yScale(0) - yScale(d.data)))
      .attr('fill', 'green');

    svg.selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text(d => d.emotion)
      .attr('text-anchor', 'middle')
      .attr('x', (d, i) => (xScale(i) + xScale.rangeBand() / 2))
      .attr('y', d => yScale(d.data))
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('fill', 'black');
  };

  return {
    update,
    resize: () => {
      width = window.innerWidth;
      height = window.innerHeight;
      svg.attr('width', width)
        .attr('height', height);
      update(saveData);
    },
  };
};
