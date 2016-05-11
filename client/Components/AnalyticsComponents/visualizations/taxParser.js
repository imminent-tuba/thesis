
let nodes = { bot: {
  name: 'bot',
  val: 1,
} };
let links = [];

const checkNodes = (name, val) => {
  if (!nodes[name]) {
    nodes[name] = { name, val };
  } else {
    nodes[name].val = nodes[name].val + val;
  }
};

const checkLinks = (t1, t2) => {
  for (let m in links) {
    console.log(links[m]);
    if (links[m].t1.name === t1 && links[m].t2.name === t2) {
      return;
    }
  }
  links.push({ t1: nodes[t1], t2: nodes[t2] });
};

module.exports = tax => {
  nodes = { bot: {
    name: 'bot',
    val: 1,
  } };
  links = [];

  for (let i in tax) {
    const newNodes = tax[i].label.split('/');
    let lastNode = null;
    for (let n in newNodes) {
      checkNodes(newNodes[n], tax[i]['SUM(score)']);
      if (lastNode) {
        checkLinks(newNodes[n], lastNode);
      } else {
        checkLinks(newNodes[n], 'bot');
      }
      lastNode = newNodes[n];
    }
  }

  const myNodes = [];
  for (var i in nodes) {
    myNodes.push(nodes[i]);
  }
  return { nodes: myNodes, links };
};
