import d3 from 'd3';
import taxUpdate from './taxParser.js';

const width = 500;
const height = 500;

module.exports = () => {
  const svg = d3.select('#d3container').append('svg')
    .attr('width', width)
    .attr('height', height);

  let chartData = {
    nodes: [{
      name: 'bot',
      r: 5,
      color: '#999',
      alpha: 1,
    }],
    links: [],
  };

  let force = d3.layout.force()
      .charge(-250)
      .linkDistance(40)
      .nodes(chartData.nodes)
      .links(chartData.links)
      .size([width, height])
      .start();

  const update = () => {
    const nodes = svg.selectAll('.bubble')
        .data(chartData.nodes);

    const links = svg.selectAll('.link')
        .data(chartData.links);

    const text = svg.selectAll('.label')
        .data(chartData.nodes);

    links.enter().append('line')
        .attr('class', 'link')
        .style('stroke-width', '10');

    nodes.enter().append('circle')
        .attr('class', 'bubble')
        .style('position', 'absolute')
        .attr('r', d => Math.sqrt(d.r * 200))
        .style('fill', d => {
          if (d.color) {
            return d.color;
          } else {
            return 'red';
          } })
        .style('fill-opacity', d => d.alpha)
        .call(force.drag);

    text.enter().append('text')
        .attr('class', 'label')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .style('text-anchor', 'middle')
        .text(d => d.name)
        .call(force.drag);

    links.exit().remove();
    nodes.exit().remove();
    text.exit().remove();

    links.attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
        .style('stroke-width', '5')
        .style('stroke', '#999')
        .style('stroke-opacity', '.6');

    nodes.attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => Math.sqrt(d.r * 200));

    text.attr('x', d => d.x)
        .attr('y', d => d.y);
  };

  d3.timer(update);

  return tax => {
    force.stop();
    chartData = taxUpdate(tax, chartData);
    force.start();
  };
};
