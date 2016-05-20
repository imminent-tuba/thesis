import d3 from '../../../resources/d3.v4.0.0-alpha.33.min.js';

const sampleColors = {
  sadness: '#0000FF',
  anger: '#FF0000',
  joy: '#FFFF00',
  disgust: '#00FF00',
  fear: '#7A378B',
};

const stroke = val => {
  return sampleColors[val[0]];
};

const convertEmotionVals = (data) => {
  var max = 0,
      emotionKey;

  for(var key in data) {
    if(max < data[key]) {
      max = data[key];
      emotionKey = key;
    }
  }
  return [emotionKey, max];
};

const generateMoreData = (data) => {
  for(let idx = 0; idx < 3; idx++) {
    data = data.concat(data.slice(0));
  }
  return data;
}

/* Main Body */
const graph = (data) => {
  const doubleData = data.slice(0);
  data = generateMoreData(data);
  console.log(data.length);
  const canvas = document.getElementById( 'graph' ),
    context = canvas.getContext( '2d' ),
    width = canvas.width,
    height = canvas.height,
    pi = Math.PI,
    n = data.length,
    tau = 2 * pi;

/* Updating only the updated nodes */
  const convertToNode = (val) => {
    val = convertEmotionVals(val);
    const r = Math.random() * width / 5,
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
  };

  const nodes = data.map( convertToNode );
  /* Node Descriptions */
  const force = d3.forceSimulation( nodes )
    .drag( 0 )
    .alphaDecay( 0 )
    .force( "charge", d3.forceManyBody().strength( 0.03 ) )
    .force( "center", d3.forceCenter( width / 3.5, height / 2.5 ) )
    .on( "tick", ticked );

    /* Physics of the D3 Body */
  function ticked() {
    context.clearRect( 0, 0, width, height );
    context.lineWidth = 4;
    context.lineCap = "butt";
    for ( let i = 0, node, vx, vy, z; i < n; ++i ) {
      node = nodes[ i ];
      context.beginPath();
      context.moveTo( node.x, node.y );
      context.lineTo( node.x + node.vx * 3, node.y + node.vy * 3 );
      context.strokeStyle = node.z;
      context.stroke();
    }
  }

  return {
    /* Update when current props.data changes */
    update: newData => {
      let updatedData;
      updatedData = newData.slice(data.length - 1);
      const nodeData = updatedData.map(convertToNode);
      data = data.concat(nodeData);
    },
  };
};

export default graph;
