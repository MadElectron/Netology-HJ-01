'use strict';

const conn = new WebSocket('wss://neto-api.herokuapp.com/counter');

window.addEventListener('load', init);
window.addEventListener('beforeunload', () => {
  conn.onclose = function () {};
  conn.close(1000, 'Соединение закрыто');
});

function init() {
  let sentData = {
    'connections': 0,
    'errors' : 0
  }

  conn.addEventListener('open', () => {
    console.log('Вебсокет-соединение открыто');
    conn.send(sentData);    
  })

  conn.addEventListener('message', message => {
    console.log(`Ответ: ${message.data}`);
    sentData = JSON.parse(message.data);

    addDataToPage(sentData);
  });

  conn.addEventListener('error', error => {
    console.log(`Произошла ошибка: ${error.data}`);
  });
}

function addDataToPage(data) {
  const counter = document.querySelector('span.counter');
  const errCounter = document.querySelector('output.errors');

  counter.textContent = data.connections;
  errCounter.textContent = data.errors;
}