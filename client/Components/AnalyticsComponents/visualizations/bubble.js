import d3 from 'd3';

const width = 500;
const height = 400;

module.exports = () => {
  const svg = d3.select('#d3container').append('svg')
    .attr('width', width)
    .attr('height', height);

  let chartData = [];

  let force = d3.layout.force()
      .gravity(0.1)
      .distance(100)
      .charge(-50)
      .nodes(chartData)
      .size([width, height]);

  function collide(node) {
    var r = node.r + 8,
    nx1 = (node.x + node.r) - r,
    nx2 = (node.x + node.r) + r,
    ny1 = (node.y + node.r) - r,
    ny2 = (node.y + node.r) + r;
    return function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== node)) {
        var x = (node.x + node.r) - (quad.point.x + quad.point.r),
        y = (node.y + node.r) - (quad.point.y + quad.point.r),
        l = Math.sqrt(x * x + y * y),
        r = node.r + quad.point.r;
        if (l < r) {
          l = (l - r) / l * 0.5;
          node.x -= x *= l;
          node.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    };
  }

  const testBounds = (node) => {
    if (node.x < 0 || node.x > width - (node.r * 2)) {
      node.x = node.x < 0 ? 0 : width - (node.r * 2);
    }
    if (node.y < 0 || node.y > height - (node.r * 2)) {
      node.y = node.y < 0 ? 0 : height - (node.r * 2);
    }
  };

  force.start();

  const update = () => {
    const q = d3.geom.quadtree(chartData);
    let i = 0;
    const n = chartData.length;

    while (++i < n) {
      q.visit(collide(chartData[i]));
      testBounds(chartData[i]);
    }

    const charts = svg.selectAll('.bubble')
        .data(chartData)
        .call(force.drag);

    charts.transition().duration(100)
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y);

    charts.enter().append('image')
        .attr('class', 'bubble')
        .style('position', 'absolute')
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y)
        .attr('width', (d) => d.r * 2)
        .attr('height', (d) => d.r * 2)
        .attr('xlink:href', '../assets/grumpy.png');

    charts.exit().remove();
  };

  d3.timer(update);

  return (emotions) => {
    delete emotions.username;
    force.stop();
    for (let i in emotions) {
      let found = false;
      for (let n in chartData) {
        if (i === chartData[n].name) {
          chartData[n].val = emotions[i];
          chartData[n].r = Math.ceil(emotions[i] * 200);
          found = true;
          break;
        }
      }
      if (!found) {
        const newVal = {
          name: i,
          val: emotions[i],
          x: Math.ceil(Math.random() * width),
          y: Math.ceil(Math.random() * height),
          r: Math.ceil(emotions[i] * 200),
        };
        chartData.push(newVal);
      }
    }
    force.start();
  };
};