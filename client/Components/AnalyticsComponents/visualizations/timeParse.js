import moment from 'moment';

module.exports = Emotions => {
  const data = { nodes: [], lines: [], labels: [] };
  const lastNodes = {
    anger: null,
    fear: null,
    joy: null,
    sadness: null,
    disgust: null,
  };

  const size = window.innerWidth / 1.8;
  const labels = {};
  const hrStart = ((Date.parse(new Date()) - Date.parse(Emotions[0].Date)) / 3600000) - Emotions[0].Hr;
  const Xunit = (size - 150) / hrStart;
  for (let i in Emotions) {
    const time = (Date.parse(new Date()) - Date.parse(Emotions[i].Date)) / 3600000 - Emotions[i].Hr;
    const x = size - (Xunit * time);
    if (!labels[Emotions[i].Date]) {
      labels[Emotions[i].Date] = [x, Emotions[i].Hr];
    }
    let total = 0;
    for (let key in Emotions[i]) {
      if (key !== 'Date' && key !== 'Hr') {
        total = total + Emotions[i][key];
      }
    }
    for (let n in Emotions[i]) {
      const y = 500;
      if (n !== 'Date' && n !== 'Hr') {
        const newNode = {
          type: n,
          x,
          y: y - (Emotions[i][n] / total) * 1500,
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
  for (let key in labels) {
    const newDate = new Date(key);
    newDate.setHours(labels[key][1]);
    const date = moment(newDate).format('M-D h:00a');
    data.labels.push({
      name: date,
      x: labels[key][0],
    });
  }
  return data;
};
