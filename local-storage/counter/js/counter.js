'use strict';

const counter = document.getElementById('counter');
const inc = document.getElementById('increment');
const dec = document.getElementById('decrement');
const reset = document.getElementById('reset');

if (localStorage.counter === undefined) {
  localStorage.setItem('counter', 0);
}
counter.textContent = localStorage.counter;

inc.addEventListener('click', event => {
  localStorage.setItem('counter', ++localStorage.counter);
  counter.textContent = localStorage.counter;
});

dec.addEventListener('click', event => {
  localStorage.setItem('counter', --localStorage.counter);
  counter.textContent = localStorage.counter;
});

reset.addEventListener('click', event => {
  localStorage.setItem('counter', 0);
  counter.textContent = localStorage.counter;
});
