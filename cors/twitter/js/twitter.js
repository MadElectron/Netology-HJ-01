'use strict';

function appendData(data) {
  Object.entries(data).forEach((prop) => {
    const [key, value] = prop;
    const node = document.querySelector(`*[data-${key}]`);
    
    if (node.tagName === 'IMG') {
      node.src = value;
    } else {
      node.textContent = value;
    }
  });
}

function loadData() {
  return new Promise((done, fail) => {
    const script = document.createElement('script');
    script.src = 'https://neto-api.herokuapp.com/twitter/jsonp?callback=appendData';
    document.body.appendChild(script);
  });
}


loadData().then(appendData);