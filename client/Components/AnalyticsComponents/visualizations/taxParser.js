const checkNodes = (name, val, nodes, alpha) => {
  let found = false;
  for (let i in nodes) {
    if (nodes[i].name === name) {
      nodes[i].r = val;
      found = true;
      break;
    }
  }
  if (!found) {
    if (!alpha) {
      alpha = 0;
    }
    nodes.push({ name, r: val, alpha });
  }
};

const checkLinks = (t1, t2, nodes, links) => {
  for (let m in links) {
    if (links[m].source.name === t1 && links[m].target.name === t2) {
      return;
    }
  }
  let newt1 = null;
  let newt2 = null;
  for (let x in nodes) {
    if (!newt1 && nodes[x].name === t1) {
      newt1 = nodes[x];
    }
    if (!newt2 && nodes[x].name === t2) {
      newt2 = nodes[x];
    }
    if (newt1 && newt2) {
      break;
    }
  }
  links.push({ source: newt1, target: newt2 });
};

module.exports = (tax, graph) => {
  const nodes = graph.nodes;
  const links = graph.links;

  for (let i in tax) {
    const newNodes = tax[i].label.split('/');
    let lastNode = null;
    for (let n in newNodes) {
      if (newNodes[n] !== '') {
        if (Number(n) === newNodes.length - 1) {
          checkNodes(newNodes[n], tax[i]['SUM(score)'], nodes, 1);
        } else {
          checkNodes(newNodes[n], tax[i]['SUM(score)'], nodes);
        }
        if (lastNode) {
          checkLinks(newNodes[n], lastNode, nodes, links);
        } else {
          checkLinks(newNodes[n], 'bot', nodes, links);
        }
        lastNode = newNodes[n];
      }
    }
  }
  return { nodes, links };
};
