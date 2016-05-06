import d3 from 'd3';

const width = 400;
const height = 300;
let data = [];
const force = d3.layout.force()
      .gravity(0.1)
      .distance(10)
      .charge(-10)
      .nodes(data)
      .size([width, height]);
let svg;

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

const chart = {
  start() {
    svg = d3.select('#d3container').append('svg')
        .attr('width', width)
        .attr('height', height);

    force.start();
    d3.timer(this.update);
  },

  newData(emotions) {
    data = [];
    for (let i in emotions) {
      const newVal = {
        name: i,
        val: emotions[i],
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.ceil(emotions[i] * 200),
      };
      data.push(newVal);
    }
    console.log(data);
  },

  update(e) {
    const q = d3.geom.quadtree(data);
    let i = 0;

    while (++i < data.length) {
      q.visit(collide(data[i]));
      testBounds(data[i]);
    }

    const bubbles = svg.selectAll('.bubble')
        .data(data)
        .call(force.drag);

    bubbles.enter().append('image')
        .attr('class', 'bubble')
        .style('position', 'absolute')
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y)
        .style('width', (d) => d.r)
        .style('height', (d) => d.r)
        .attr('xlink:href', '../../assets/bubble.jpg');

    bubbles.exit().remove();
  },
};

module.exports = chart;
