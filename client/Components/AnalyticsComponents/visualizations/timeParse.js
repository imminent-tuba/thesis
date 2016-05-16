module.exports = Emotions => {
  const data = { nodes: [], lines: [] };
  let x = 100;
  const lastNodes = {
    anger: null,
    fear: null,
    joy: null,
    sadness: null,
    disgust: null,
  };
  for (let i in Emotions) {
    x = x + 50;
    for (let n in Emotions[i]) {
      const y = 600;
      if (n !== 'timestamp') {
        const newNode = {
          type: n,
          x,
          y: y - (Emotions[i][n]) * 300,
          r: 6,
        };
        data.nodes.push(newNode);
        if (lastNodes[n]) {
          const newLine = {
            source: lastNodes[n],
            target: newNode,
          };
          data.lines.push(newLine);
        }
        lastNodes[n] = newNode;
      }
    }
  }
  console.log(data);
  return data;
};
