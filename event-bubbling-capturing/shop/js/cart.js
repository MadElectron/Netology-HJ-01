'use strict';

function init() {
  const buttons = document.querySelectorAll('a.add-to-cart');

  [...buttons].forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault();
      
      const item = {};
      item.title = btn.dataset.title;
      item.price = btn.dataset.price;

      addToCart(item);
    })
  });
}

init();

showMore.addEventListener('click', init);