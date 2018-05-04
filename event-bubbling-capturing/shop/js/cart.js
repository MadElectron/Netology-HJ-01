'use strict';

function init() {
  const itemsList =  document.querySelector('.items-list');

  itemsList.addEventListener('click', event => {
    if (event.target.classList.contains('add-to-cart')) {
      event.preventDefault();

      const item = {};
      item.title = event.target.dataset.title;
      item.price = event.target.dataset.price;

      addToCart(item);
    }
  });
}

init();

