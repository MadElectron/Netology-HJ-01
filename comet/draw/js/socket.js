'use strict';

const conn = new WebSocket('wss://neto-api.herokuapp.com/draw');

conn.addEventListener('open', () => {
  console.log('Вебсокет-соединение открыто');
});

window.editor.addEventListener('update', evt => {
  evt.canvas.toBlob(blob => conn.send(blob));
});

