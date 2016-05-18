import d3 from '../../../../node_modules/d3/d3.v4.0.0-alpha.33.min.js';
// import d3 from 'd3';
const sampleColors = {
  sadness: 'blue',
  anger: 'red',
  happiness: 'green',
  disgust: 'violet',
  fear: 'black',
}
const stroke = ((val) => {
  // var letters = '0123456789ABCDEF'.split('');
  // var color = '#';
  // for (var i = 0; i < 6; i++ ) {
  //   color += letters[Math.floor(Math.random() * 16)];
  // }
  // return color;
  if(val === 'sadness') {
    return 'blue';
  }
  if(val === 'anger') {
    return 'red';
  }
  if(val === 'happiness') {
    return 'green';
  }
  if(val === 'disgust') {
    return 'violet';
  }
  if(val === 'fear') {
    return 'black';
  }
  // var color = '';
  // for(var key in sampleColors) {
  //   color = sampleColors[key];
  // }
  // return color;
});

const convertEmotionVals = (emotion) => {
  var max = 0,
      emotionKey;
  for(var key in emotion) {
    if(max < emotion[key]) {
      max = emotion[key];
      emotionKey = key;
    }
  }
  return [emotionKey, max];
}

const graph = (data) => {
  const canvas = document.getElementById( 'graph' ),
    context = canvas.getContext( '2d' ),
    width = 300,
    height = 200;


    const pi = Math.PI,
    n = data.length,
    tau = 2 * pi;

  // const nodes = [];
  data.map(function(val, idx) {
    return convertEmotionVals(val);
  });
  console.log(data);

  const nodes = d3.range( n ).map( (val) => {
    let r = Math.random() * width / 3,
      a = Math.random() * tau,
      x = width / 2 + r * Math.cos( a ),
      y = height / 2 + r * Math.sin( a ),
      z = stroke(val);
    return {
      x: x,
      y: y,
      vx: ( height / 2 - y ) * 0.006,
      vy: ( x - width / 2 ) * 0.006,
      z: z,
    };
  } );

  const force = d3.forceSimulation( nodes )
    .drag( 0 )
    .alphaDecay( 0 )
    .force( "charge", d3.forceManyBody().strength( 0.01 ) )
    .force( "center", d3.forceCenter( width / 2, height / 2 ) )
    .on( "tick", ticked );

  // force(nodes);

  // const stroke = d3.scaleLinear()
  //   .domain( [ 0, 10, 20, 30, 40 ] )
  //   .range( [ "blue", "red", "green", "yellow", "violet" ] );

  function ticked() {
    context.clearRect( 0, 0, width, height );
    context.lineWidth = 4;
    context.lineCap = "square";

    for ( let i = 0, node, vx, vy; i < n; ++i ) {
      node = nodes[ i ];
      context.beginPath();
      context.moveTo( node.x, node.y );
      context.lineTo( node.x + node.vx * 3, node.y + node.vy * 3 );
      context.strokeStyle = node.z;
      context.stroke();
    }
  }
  // return {
  //   update: data => {
  //
  //   },
  //   resize: () => {
  //
  //   }
  // }
};

export default graph;
