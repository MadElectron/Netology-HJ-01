'use strict';

loadData('https://neto-api.herokuapp.com/food/42', 'appendRecipeData')
  .then(appendRecipeData);
loadData('https://neto-api.herokuapp.com/food/42/rating', 'appendRatingData')
  .then(appendRatingData);
loadData('https://neto-api.herokuapp.com/food/42/consumers', 'appendConsumersData')
  .then(appendRecipeData);

function loadData(url, callback) {
  return new Promise((done, fail) => {
    const script = document.createElement('script');
    script.src = `${url}?callback=${callback}`;
    document.body.appendChild(script);
  });
}

function appendRecipeData(data) {
  Object.entries(data).forEach((prop) => {

    const [key, value] = prop;
    const node = document.querySelector(`*[data-${key}]`);
    
    if (node) {
      if (node.tagName === 'DIV') {
        node.style.background = `url(${value})`;
      } else {
        node.textContent = value instanceof Array ? value.join(', ') : value;
      }      
    }
  });
}

function appendRatingData(data) {
  const rating = document.querySelector(`*[data-rating]`);
  const stars =  document.querySelector(`*[data-star]`);
  const votes =  document.querySelector(`*[data-votes]`);

  rating.textContent = data.rating.toFixed(2);
  stars.style.width = `${data.rating * 10}%`;
  votes.textContent = data.votes;
}

function appendConsumersData(data) {
  const consumers = document.querySelector(`*[data-consumers]`);
  
  data.consumers.forEach(el => {
    const widget = document.createElement('img');
    widget.src = el.pic;
    widget.title = el.name;
    consumers.appendChild(widget);
  });

  const span =  document.createElement('span');
  span.textContent = `(+${data.total})`;
  consumers.appendChild(span);
}