'use strict';

const poolingUrl = 'https://neto-api.herokuapp.com/comet/pooling';
const longPoolingUrl = 'https://neto-api.herokuapp.com/comet/long-pooling';
const interval = 5000;
const longInterval = 7000;

const conn = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

function setNumber(num, connType) {
  const cards = document.querySelectorAll(`section.${connType} > div`);
  const card = [...cards].find(el => el.textContent === num);
  // console.log(card);

  [...cards].forEach(el => el.classList.remove('flip-it'));
  card.classList.add('flip-it');
}


setInterval(() => {
  fetch(poolingUrl)
    .then(resp => resp.text())
    .then(data => setNumber(data, 'pooling'));
}, interval);

setInterval(() => {
  fetch(longPoolingUrl)
    .then(resp => resp.text())
    .then(data => setNumber(data.trim(), 'long-pooling'));
}, longInterval);

conn.addEventListener('message', evt => {
  setNumber(evt.data, 'websocket');
});