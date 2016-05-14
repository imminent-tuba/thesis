import d3 from 'd3';

const width = 700;
const height = 600;
const colorArray = ['yellow','green','black','red','blue','pink','orange','white'];

module.exports = () => {
  // const svg = d3.select('#d3container').append('svg')
  //   .attr('width', width)
  //   .attr('height', height);

  var diameter = 960,
      format = d3.format(",d"),
      color = d3.scale.category20c();

  var bubble = d3.layout.pack()
      .sort(null)
      .size([diameter, diameter])
      .padding(1.5);

  var svg = d3.select("#d3container").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "bubble");

 
  let chartData = [];

  let force = d3.layout.force()
      .gravity(0.2)
      .distance(10)
      .charge(-50)
      .nodes(chartData)

      .size([width*.50, height*.50]);

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

    const text = svg.selectAll('.label')
        .data(chartData)
        .call(force.drag);

    charts.transition().duration(30)
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y);
    
    charts.enter().append('image')
        .attr('class', 'bubble')
        .style('position', 'absolute')
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y)
        .attr('width', (d) => d.r * 2)
        .attr('height', (d) => d.r * 2)
        .attr('xlink:href', (d) => {
          return 'http://zurapps.com/all/wp-content/uploads/2013/08/' + colorArray[Math.floor(Math.random() * 8)] + 'Bubble.png';
        });


        // .attr('xlink:href', (d) => {
        //   switch (d.name) {
        //     case 'fear':
        //       return 'http://zurapps.com/all/wp-content/uploads/2013/08/' + colorArray[Math.floor(Math.random() * 8)] + 'Bubble.png';
        //       break;
        //     case 'joy':
        //       return 'http://zurapps.com/all/wp-content/uploads/2013/08/' + colorArray[Math.floor(Math.random() * 8)] + 'Bubble.png';
        //       break;
        //     case 'sadness':
        //       return 'http://zurapps.com/all/wp-content/uploads/2013/08/blueBubble.png';
        //       break;
        //     case 'disgust':
        //       return 'http://zurapps.com/all/wp-content/uploads/2013/08/blackBubble.png';
        //       break;
        //   default:
        //     return 'http://zurapps.com/all/wp-content/uploads/2013/08/redBubble.png';
        //   }
        // });
        // http://zurapps.com/all/wp-content/uploads/2013/08/whiteBubble.png
//http://zurapps.com/all/wp-content/uploads/2013/08/blackBubble1.png
    //['yellow','green','black','red','blue','pink','orange','']
    text.enter().append('text')
        .attr('class', 'label')
        .attr("dy", ".3em")
        .style('position', 'absolute')
        .attr('x', (d) => d.x + d.r)
        .attr('y', (d) => d.y + d.r)
        .style('text-anchor', 'middle')
        .style('fill', 'white')
        .text(d => d.name.toUpperCase());

    charts.exit().remove();
    text.exit().remove();

    text.attr('x', d => d.x + d.r)
        .attr('y', d => d.y + d.r);
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
          x: Math.ceil(Math.random() * width-40),
          y: Math.ceil(Math.random() * height-40),
          r: Math.ceil(emotions[i] * 9),
        };
        chartData.push(newVal);
      }
    }
    force.start();
  };
};
