import moment from 'moment';

module.exports = Emotions => {
  console.log(Emotions);
  const data = { nodes: [], lines: [], labels: [] };
  const lastNodes = {
    anger: null,
    fear: null,
    joy: null,
    sadness: null,
    disgust: null,
  };

  const size = window.innerWidth / 1.8;
  const hrStart = (Date.parse(new Date()) - Date.parse(Emotions[0].Date)) / 3600000 - Emotions[0].Hr;
  const Xunit = (size - 150) / hrStart;

  let dayCount = hrStart + Emotions[0].Hr - 24;
  const dateLabel = new Date(Emotions[0].Date);
  let theDate = dateLabel.getDate() + 1;
  while (dayCount > 0) {
    dateLabel.setDate(theDate);
    const newDate = {
      name: moment(dateLabel).format('MM-DD'),
      x: size - dayCount * Xunit,
      y: 425,
    };
    data.labels.push(newDate);
    theDate++;
    dayCount -= 24;
  }

  let startHr = Emotions[0].Hr;
  let hour = Math.floor(hrStart);
  const unit = Math.floor(hrStart / 7);
  while (hour > 0) {
    const newTime = {
      name: moment(startHr.toString(), 'h').format('ha'),
      x: size - hour * Xunit,
      y: 400,
    };
    data.labels.push(newTime);
    startHr = (startHr + unit) % 24;
    hour = hour - unit;
  }

  for (let i in Emotions) {
    const time = (Date.parse(new Date()) - Date.parse(Emotions[i].Date)) / 3600000 - Emotions[i].Hr;
    const x = size - (Xunit * time);
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
  return data;
};
