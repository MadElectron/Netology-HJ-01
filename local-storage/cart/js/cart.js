'use strict';

const colorSwatch = document.getElementById('colorSwatch');
const sizeSwatch = document.getElementById('sizeSwatch');
const cart =  document.getElementById('quick-cart');
const form = document.getElementById('AddToCartForm');

fetch('https://neto-api.herokuapp.com/cart/colors')
  .then(res => res.json())
  .then(list => list.forEach(
    color => addColorSnippet(color)
  ))
  .catch(err => console.error(err.message));

fetch('https://neto-api.herokuapp.com/cart/sizes')
  .then(res => res.json())
  .then(list => list.forEach(
    size => addSizeSnippet(size)
  ))
  .catch(err => console.error(err.message));

fetch('https://neto-api.herokuapp.com/cart')
  .then(res => res.json())
  .then(list => console.log(list))
  .catch(err => console.error(err.message));



function addColorSnippet(color) {
  const newElement = `
  <div data-value="${color.type}" class="swatch-element color ${color.type} ${color.isAvailable ? 'available' : 'soldout'}">
  <div class="tooltip">${color.title}</div>
  <input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="red" checked ${color.isAvailable ? '' : 'disabled'}>
  <label for="swatch-1-${color.type}" style="border-color: ${color.code};">
    <span style="background-color: ${color.code};"></span>
    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
  </label>
</div>
  `;
  colorSwatch.innerHTML = colorSwatch.innerHTML + newElement;
}

function addSizeSnippet(size) {
  const newElement = `
  <div data-value="${size.type}" class="swatch-element plain ${size.type} ${size.isAvailable ? 'available' : 'soldout'}">
  <input id="swatch-0-${size.type}" type="radio" name="size" value="${size.type}" ${size.isAvailable ? '' : 'disabled'}>
  <label for="swatch-0-${size.type}">
    ${size.title}
    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
  </label>
</div>
  `;
  sizeSwatch.innerHTML = sizeSwatch.innerHTML + newElement;
}

form.addEventListener('submit', event => {
  // xhr.open('POST', )
  event.preventDefault();

  const formData = new FormData(event.target);
  const productId = event.target.dataset.productId;

  formData.append('productId', productId);

  const requestData = {};
  [...formData].forEach(e => {
    requestData[e[0]] = e[1];
  })

  console.log(JSON.stringify(requestData));
  fetch('https://neto-api.herokuapp.com/cart', {
    method: 'POST',
    body: JSON.stringify(requestData),
    // body: formData,
    headers: {
      'Content-Type' : 'application/json'
    }
  })
    .then(res => res.json())
    .then(list => console.log(list))
    .catch(err => console.error(err.message));
});
