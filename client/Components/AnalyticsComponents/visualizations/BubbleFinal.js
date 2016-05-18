import d3 from 'd3';

const colorArray = ['yellow','green','black','red','blue','pink','orange','white'];

module.exports = () => {
  let width = window.innerWidth;
  const height = window.innerHeight - 100;

  const svg = d3.select('#d3container').append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'bubble');

  let chartData = [];

  let force = d3.layout.force()
      .gravity(0.2)
      .distance(100)
      .charge(-150)
      .nodes(chartData)
      .size([width*.80, height*.55]);

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

  force.start();

  const update = () => {
    const q = d3.geom.quadtree(chartData);
    let i = 0;
    const n = chartData.length;

    while (++i < n) {
      q.visit(collide(chartData[i]));
    }

    const charts = svg.selectAll('.bubble')
        .data(chartData)
        .call(force.drag);

    const text = svg.selectAll('.label')
        .data(chartData)
        .call(force.drag);

    charts.transition().duration(30)
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    
    charts.enter().append('image')
        .attr('class', 'bubble')
        .style('position', 'absolute')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('width', d => d.r * 2)
        .attr('height', d => d.r * 2)
        .attr('xlink:href', d => {
          return 'http://zurapps.com/all/wp-content/uploads/2013/08/' + colorArray[Math.floor(Math.random() * 8)] + 'Bubble.png';
        });
// colorArray[Math.floor(Math.random() * 8)]
    text.enter().append('text')
        .attr('class', 'label')
        .attr('dy', '.3em')
        .style('position', 'absolute')
        .attr('x', d => d.x + d.r)
        .attr('y', d => d.y + d.r)
        .style('text-anchor', 'middle')
        .style('fill', '#00cdcd')
        .text(d => {
          if (d.name.indexOf(' ') !== -1) {
           return d.name.substr(0, d.name.indexOf(' ')).toUpperCase();
          } else {
           return d.name.toUpperCase();
          }
        });

    charts.exit().remove();
    text.exit().remove();

    text.attr('x', d => d.x + d.r)
        .attr('y', d => d.y + d.r);
  };

  d3.timer(update);

  return {
    update: (keywords) => {
      force.stop();
      for (let i in keywords) {
        let found = false;
        for (let n in chartData) {
          if (keywords[i].keyword_text === chartData[n].name) {
            chartData[n].val = keywords[i]['SUM(relevance)'];
            chartData[n].r = Math.ceil(Math.sqrt(keywords[i]['SUM(relevance)'] * 1000));
            found = true;
            break;
          }
        }
        if (!found) {
          const newVal = {
            name: keywords[i].keyword_text,
            val: keywords[i]['SUM(relevance)'],
            x: Math.ceil(Math.random() * width),
            y: Math.ceil(Math.random() * height),
            r: Math.ceil(Math.sqrt(keywords[i]['SUM(relevance)'] * 1000)),
          };
          chartData.push(newVal);
        }
      }
      force.start();
    },
    resize: () => {
      force.stop();
      width = window.innerWidth;
      force.size([width*.80, height*.55]).start();
    },
  };
};
