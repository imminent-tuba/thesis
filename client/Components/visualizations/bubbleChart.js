import d3 from 'd3';

const width = 1200;
const height = 1500;

module.exports = () => {
  var generateData = function() {
    var asteroidLocs = [];
    for (var i = 0; i < 200; i++) {
      var toAdd = {};
      toAdd['x'] = Math.round(Math.random() * width);
      toAdd['y'] = Math.round(Math.random() * height);
      toAdd['r'] = Math.round(Math.random() * 40) + 10;
      asteroidLocs.push(toAdd);
    }
    return asteroidLocs;
  };

  var svg = d3.select('#d3container').append('svg')
    .attr('width', width)
    .attr('height', height);

  var asteroidData = generateData();

  var force = d3.layout.force()
      .gravity(0.01)
      .distance(100)
      .charge(-50)
      .nodes(asteroidData)
      .size([width, height])
      .on('end', function() { return force.start(); });

const collide = (node) => {
  let r = node.r + 8;
  let nx1 = (node.x + node.r) - r;
  let nx2 = (node.x + node.r) + r;
  let ny1 = (node.y + node.r) - r;
  let ny2 = (node.y + node.r) + r;
  return (quad, x1, y1, x2, y2) => {
    if (quad.point && (quad.point !== node)) {
      let x = (node.x + node.r) - (quad.point.x + quad.point.r);
      let y = (node.y + node.r) - (quad.point.y + quad.point.r);
      let l = Math.sqrt(x * x + y * y);
      let r = node.r + quad.point.r;
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
};

const testBounds = (asteroid) => {
  if (asteroid.x < 0 || asteroid.x > width - (asteroid.r * 2)) {
    asteroid.x = asteroid.x < 0 ? 0 : width - (asteroid.r * 2);
  }
  if (asteroid.y < 0 || asteroid.y > height - (asteroid.r * 2)) {
    asteroid.y = asteroid.y < 0 ? 0 : height - (asteroid.r * 2);
  }
};

  force.start();

  var update = function(e) {

    //updateData();
    var q = d3.geom.quadtree(asteroidData),
        i = 0,
        n = asteroidData.length;

    while (++i < n) {
      q.visit(collide(asteroidData[i]));
      testBounds(asteroidData[i]);
    };

    var asteroids = svg.selectAll('.asteroid')
        .data(asteroidData)
        .call(force.drag);

    asteroids.transition().duration(100)
    .attr('x', function(d) { return d['x']; })
    .attr('y', function(d) { return d['y']; });

    asteroids.enter().append('image')
        .attr('class', 'asteroid')
        .attr('x', function(d) { return d['x']; })
        .attr('y', function(d) { return d['y']; })
        .style('width', function(d) { return d['r'] * 2; })
        .style('height', function(d) { return d['r'] * 2; })
        .attr('xlink:href', '../../assets/Tbubble.bmp');

    asteroids.exit().remove();
  };

  d3.timer(update);
}