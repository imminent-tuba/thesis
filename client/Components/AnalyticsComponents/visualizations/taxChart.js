import d3 from 'd3';
import taxUpdate from './taxParser.js'

const width = 500;
const height = 400;

module.exports = () => {
  const svg = d3.select('#d3container').append('svg')
    .attr('width', width)
    .attr('height', height);

  let chartData = {
    nodes: [],
    links: [],
  }

  let force = d3.layout.force()
      .gravity(0.1)
      .distance(100)
      .charge(-50)
      .nodes(chartData.nodes)
      .links(chartData.links)
      .size([width, height]);

  force.start();

  const update = () => {
    const nodes = svg.selectAll('.bubble')
        .data(chartData.nodes)
        .call(force.drag);

    const links = svg.selectAll('.line')
        .data(chartData.nodes)
        .call(force.drag);

    nodes.transition().duration(100)
        .attr('x', d => d.x)
        .attr('y', d => d.y);

    nodes.enter().append('image')
        .attr('class', 'bubble')
        .style('position', 'absolute')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('width', d => d.val)
        .attr('height', d => d.val)
        .attr('xlink:href', '../assets/grumpy.png');

    nodes.exit().remove();
  };

  d3.timer(update);

  return Sax => {
    force.stop();
    chartData = taxUpdate(tax);
    force.start();
  };
};
