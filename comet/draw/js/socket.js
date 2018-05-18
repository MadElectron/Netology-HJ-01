'use strict';

const conn = new WebSocket('wss://neto-api.herokuapp.com/draw');

conn.addEventListener('open', () => {
  console.log('Вебсокет-соединение открыто');
});

conn.addEventListener('message', evt => {
  console.log(`Ответ: ${evt.data}`);
});

window.editor.addEventListener('update', evt => {
  conn.send(evt.canvas);
});

