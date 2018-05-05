'use strict';

const canvas = document.querySelector('canvas');
const conn = new WebSocket('wss://neto-api.herokuapp.com/mouse');

showBubbles(conn);

canvas.addEventListener('click', event => {
  conn.send(JSON.stringify({
    'x' : event.pageX,
    'y' : event.pageY,
  }));
})