const buttons= document.querySelectorAll('button.add');
const cartCount = document.querySelector('#cart-count');
const cartPrice = document.querySelector('span#cart-total-price');

Array.from(buttons).forEach(button => {
  button.addEventListener('click', () => {
    cartCount.innerHTML = parseInt(cartCount.innerHTML) + 1;
    cartPrice.innerHTML = parseInt(cartPrice.innerHTML)
      + parseInt(button.dataset.price);
  })   
});