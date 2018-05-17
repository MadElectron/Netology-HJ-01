'use strict';

function createElement(node) {
  let el;

  if (typeof node === 'object') {
    el = document.createElement(node.name);
    let childNode;

    if (node.props != null) {
      Object.entries(node.props).forEach((v,k) => {
        el.className = v[1];
        console.log(v);
      });
    }

    node.childs.forEach(child => {
      childNode = createElement(child);
      el.appendChild(childNode);
    });
  } else {
    el = document.createTextNode(node);
  }

  return el;
}