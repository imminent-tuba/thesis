import d3 from 'd3';

const width = 500;
const height = 400;

module.exports = () => {
  // var generateData = function() {
  //   var asteroidLocs = [];
  //   for (var i = 0; i < 10; i++) {
  //     var toAdd = {};
  //     toAdd['x'] = Math.round(Math.random() * width);
  //     toAdd['y'] = Math.round(Math.random() * height);
  //     toAdd['r'] = Math.round(Math.random() * 40) + 10;
  //     asteroidLocs.push(toAdd);
  //   }
  //   return asteroidLocs;
  // };

  const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

  let asteroidData = [];

  let force = d3.layout.force()
      .gravity(0.1)
      .distance(100)
      .charge(-50)
      .nodes(asteroidData)
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
          l = (l - r) / l * .5;
          node.x -= x *= l;
          node.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    };
  }

  const testBounds = (asteroid) => {
    if (asteroid['x'] < 0 || asteroid['x'] > width - (asteroid['r'] * 2)) {
      asteroid['x'] = asteroid['x'] < 0 ? 0 : width - (asteroid['r'] * 2);
    }
    if (asteroid['y'] < 0 || asteroid['y'] > height - (asteroid['r'] * 2)) {
      asteroid['y'] = asteroid['y'] < 0 ? 0 : height - (asteroid['r'] * 2);
    }
  };

  force.start();

  const update = () => {
    const q = d3.geom.quadtree(asteroidData);
    let i = 0;
    const n = asteroidData.length;

    while (++i < n) {
      q.visit(collide(asteroidData[i]));
      testBounds(asteroidData[i]);
    }

    const asteroids = svg.selectAll('.asteroid')
        .data(asteroidData)
        .call(force.drag);

    asteroids.transition().duration(100)
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y);

    asteroids.enter().append('image')
        .attr('class', 'asteroid')
        .style('position', 'absolute')
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y)
        .attr('width', (d) => d.r * 2)
        .attr('height', (d) => d.r * 2)
        .attr('xlink:href', '../assets/grumpy.png');

    asteroids.exit().remove();
  };

  d3.timer(update);

  return (emotions) => {
    delete emotions.username;
    force.stop();
    for (let i in emotions) {
      let found = false;
      for (let n in asteroidData) {
        if (i === asteroidData[n].name) {
          asteroidData[n].val = emotions[i];
          asteroidData[n].r = Math.ceil(emotions[i] * 200);
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
        asteroidData.push(newVal);
      }
    }
    force.start();
  };
};
