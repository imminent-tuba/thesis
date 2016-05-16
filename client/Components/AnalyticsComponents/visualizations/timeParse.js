module.exports = Emotions => {
  const data = { nodes: [], lines: [] };
  let x = 200;
  const lastNodes = {
    anger: null,
    fear: null,
    joy: null,
    sadness: null,
    disgust: null,
  };
  for (let i in Emotions) {
    x = x + 50;
    let total = 0;
    for (let key in Emotions[i]) {
      if (key !== 'timestamp') {
        total = total + Emotions[i][key];
      }
    }
    for (let n in Emotions[i]) {
      const y = 600;
      if (n !== 'timestamp') {
        const newNode = {
          type: n,
          x,
          y: y - (Emotions[i][n] / total) * 1000,
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
  return data;
};
