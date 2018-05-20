'use strict';

const colorSwatch = document.getElementById('colorSwatch');
const sizeSwatch = document.getElementById('sizeSwatch');
const quickCart =  document.getElementById('quick-cart');
const form = document.getElementById('AddToCartForm');

fetch('https://neto-api.herokuapp.com/cart/colors')
  .then(res => res.json())
  .then(list => initColors(list))
  .catch(err => console.error(err.message));

fetch('https://neto-api.herokuapp.com/cart/sizes')
  .then(res => res.json())
  .then(list => initSizes(list))
  .catch(err => console.error(err.message));

fetch('https://neto-api.herokuapp.com/cart')
    .then(res => res.json())
    .then(list => initCart(list))
    .catch(err => console.error(err.message));

function addColorSnippet(color) {
  const newElement = `
  <div data-value="${color.type}" class="swatch-element color ${color.type} ${color.isAvailable ? 'available' : 'soldout'}">
  <div class="tooltip">${color.title}</div>
  <input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="red" ${localStorage.color === `swatch-1-${color.type}` ? 'checked' : ''} ${color.isAvailable ? '' : 'disabled'}>
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
  <input id="swatch-0-${size.type}" type="radio" name="size" value="${size.type}" ${localStorage.size === `swatch-0-${size.type}` ? 'checked' : ''} ${size.isAvailable ? '' : 'disabled'}>
  <label for="swatch-0-${size.type}">
    ${size.title}
    <img class="crossed-out" src="data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAyCAQAAACzWFxqAAAEEElEQVR4Ae2c8WcrSxiGnwihhFBKCSGEUA7lUg7LEEr/of5vJSzD/BQO5VBCCaWUUkoJdete1ivdzXePuHOSPcl2nv2loznq5NmZ/fadb7d1/TdtKLglJ+B5oW4SbbLi+Kt13Sl+cGR0KOCOKZ7AM7smYb791jWirV9kHFHAXGKeSGybI5zmRLs6DSSkgj5KV+N7iXnkd0n0yHQgfpATCLyszRCL/qErifHk+CQmgmN9lxcggo5XKlghlgscjoyexgsCNwQe2ETipBBxxZnGHysRbxiMkA2cc0lGxrHGDxKzYJ3EKRkTJow1fi8keALviFghlm8Sc6Lxo5ayexKDQoRjpPFSGgIfiG0JsZwVYlxJTMAz/ZJihmTFtzHU+JWgw7JlIZZxMTkzTjV+kpg5zWeEK0T0NX7R0jRD1CfEMpKYvsbPEnNH8xhziSudhM+FiBv7f61fiGUoMQONX/AEcm45fM6Z6Pr5uRrk5MwR+ybErquOQWU65/zg8LjAmQrTFDJ7KsQwkJjqBS9nxt5jbo4XBKam1D8MIYa+xIw0fluVhPuGzfVMSnHAQgynOFzppmkpLbZWr5uONGR0IgLWQxNixShWWImRFl+7mC7ZWvb6kynBbkE0W4jNe0zMUEv26vgOYoZX9iq+mBCTiDomnGv8IS2B5Y7/Equ5+YZIQj7p4daiam8T0ihOcGRcrmWv3ihPQjYvKPHnseo7V8lepXjzopiEWLoSk1VWem83dwwDheDDUqEdW88lIYYjaclKfTJTewlWRnCl8CY+e01Cou8WVKTS4xJnstcpt4gkZKdipMVJjKg5Z05CTPbqOKbKnByP5ykJqQXTdqHslVPcWgOTZ7qrBqYkxHSMKXv1pv/luz4pYSwk5iEJ2ea1opy95uSbz3ztYrjPmSQxiyQkssw12esNgcBTxLXGme2lnEUSEncjeEu+lez1jKtqA5PE3CchGzOsUvbqeWW7jCXmNH5nvPHxu8lefUyYGNHA5HCl3hFPiLh/adQGVTl7VeTH8g93Vz3rDv/n1xDSV+RXbrfcj+x1KDEDE700UshAkd/+Z68DnGkM9XhmzRAywqlx7tDagGx8r0X1MIWMmZjs1R9iB6NZZDW38QcgRF3xrtpuaWuXRjz1sZSWwMceCjEP9DxqRsxpGGZv/l1aAu/7ICTT0TPBRNM5UeH+zRbu9Qtpr0R0bab6xTiWmFIDkxaz5W6FmH269Ni06ZNxCn8iMwcJiWoxuGP6n9lrorvauRHMFI++xguxj7qT3okS2TPs7GsC/o8Q86i76YZKxOzsOLINL/oxQkzlsNVGzkRHWn79oh8J+fWj7rvIXhNtacnsi35a130cE9wfzF7TW7LcZ7dA6/qfcj5TWKqdhLRkdP8FEUsCA8Jz4dUAAAAASUVORK5CYII=">
  </label>
</div>
  `;
  sizeSwatch.innerHTML = sizeSwatch.innerHTML + newElement;
}

function addGoodsSnippet(item) {
  const newElement = `
  <div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${item.productId}" style="opacity: 1;">
    <div class="quick-cart-product-wrap">
      <img src="${item.pic}" title="${item.title}">
      <span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
      <span class="s2"></span>
    </div>
    <span class="count hide fadeUp" id="quick-cart-product-count-${item.productId}">${item.quantity}</span>
    <span class="quick-cart-product-remove remove" data-id="${item.productId}"></span>
  </div>
  `;

  quickCart.innerHTML = quickCart.innerHTML + newElement;
}

function addCartSnippet(cart) {
  const newElement = `
    <a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${cart.count ? 'open' : ''}">
      <span>
        <strong class="quick-cart-text">Оформить заказ<br></strong>
        <span id="quick-cart-price">$${cart.total.toFixed(2)}</span>
      </span>
    </a>
  `;

  quickCart.innerHTML = quickCart.innerHTML + newElement;   
}

function initColors(list)  {
  list.forEach(
    color => addColorSnippet(color)
  );

  const colorBtns = document.querySelectorAll('input[name="color"]');
  [...colorBtns].forEach(btn => btn.addEventListener('click', event => {
    localStorage.color = event.target.id;
    // console.log(localStorage);
  }));
}

function initSizes(list) {
  list.forEach(
    size => addSizeSnippet(size)
  );

  const sizeBtns = document.querySelectorAll('input[name="size"]');
  [...sizeBtns].forEach(btn => btn.addEventListener('click', event => {
    localStorage.size = event.target.id;
    // console.log(localStorage);
  }));
}

function initCart(list) {
  const cart = {
    total: list.reduce((sum, item) => 
      sum + item.quantity * item.price
    , 0),
    count: list.length
  };

  // console.log(list);

  quickCart.innerHTML = '';
  list.forEach(item => addGoodsSnippet(item));
  addCartSnippet(cart);

  const removeBtns = document.querySelectorAll('.remove');
  [...removeBtns].forEach(btn => btn.addEventListener('click', removeItem));
}

function removeItem(event) {
  const productId = event.target.dataset.id;
  const formData = new FormData();

  formData.append('productId', productId);

  fetch('https://neto-api.herokuapp.com/cart/remove', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(list => initCart(list))
      .catch(err => console.error(err.message));
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const productId = event.target.dataset.productId;

  formData.append('productId', productId);

  fetch('https://neto-api.herokuapp.com/cart', {
    method: 'POST',
    body: formData,
  })
    .then(res => res.json())
    .then(list => initCart(list))
    .catch(err => console.error(err.message));
});
