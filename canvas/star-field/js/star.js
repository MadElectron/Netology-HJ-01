'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const colors = ['#ffffff', '#ffe9c4', '#d4fbff'];

function rand(min, max, float = false) {
  const result = Math.random() * (max - min) + min;
  return float ? result : Math.floor(result);
}

function draw() {
  const starCount = rand(200, 400);

  // Setting canvas attributes
  const style = window.getComputedStyle(canvas);
  canvas.width = parseInt(style.getPropertyValue('width'));
  canvas.height = parseInt(style.getPropertyValue('height'));

  ctx.fillStyle = '#000000';
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();

  for (let i = 0; i < starCount; i++) {
    const posX = rand(0, canvas.width);
    const posY = rand(0, canvas.height);
    const radius = rand(0, 1.1/2, true);

    ctx.globalAlpha = rand(0.8, 1, true);
    ctx.fillStyle = colors[rand(0, 2)]; 

    ctx.beginPath();
    ctx.arc(posX, posY, radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}

document.addEventListener('DOMContentLoaded', draw);
canvas.addEventListener('click', draw)

