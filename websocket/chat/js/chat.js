'use strict'

const conn = new WebSocket('wss://neto-api.herokuapp.com/chat');

const chat = document.querySelector('.chat');
const msgBox = chat.querySelector('.message-box');
const msgInput = chat.querySelector('.message-input');
const submit = chat.querySelector('.message-submit');
const content = chat.querySelector('.messages-content');
const templates = chat.querySelector('.messages-templates');

var userMsg = templates.querySelector('.message.message-personal');
var compMsg = templates.querySelector('.message:not(.loading)');
var statusMsg = templates.querySelector('.message.message-status');
var loadingMsg =  templates.querySelector('.message.loading');

const chatStatus = chat.querySelector('.chat-status');


window.addEventListener('load', init);
window.addEventListener('beforeunload', () => {
  conn.close(1000, 'Соединение закрыто');
});

conn.addEventListener('open', () => {
  console.log('Соединение открыто');

  chatStatus.textContent = chatStatus.dataset.online;
  submit.removeAttribute('disabled');
  showMessage('statusMsg', 'Пользователь появился в сети');
});

conn.addEventListener('close', () => {
  chatStatus.textContent = chatStatus.dataset.offline;
  submit.setAttribute('disabled', 'disabled');
  showMessage('statusMsg', 'Пользователь не в сети');
});

conn.addEventListener('message', event => {
  if (event.data === '...') {
    showMessage('loadingMsg');
  } else {
    const loading = content.querySelector('.message-loading');
    if (loading) {
      loading.remove();
    }
    showMessage('compMsg', event.data);
  }
})

msgBox.addEventListener('submit', event => {
  event.preventDefault();

  conn.send(msgInput.value);
  showMessage('userMsg', msgInput.value);
  msgInput.value = '';
});


function showMessage(type, text = '') {
  const msg = window[type].cloneNode(true);
  const msgText = msg.querySelector('.message-text');
  const timestamp = msg.querySelector('.timestamp');

  if (msgText) {
    msgText.textContent = text;
  }
  if (timestamp) {
    const dt = new Date();
    timestamp.textContent = dt.toLocaleTimeString('ru-RU', {
      hour: '2-digit', 
      minute:'2-digit'
    });
  }

  content.appendChild(msg);
  content.scrollTop = content.scrollHeight;  
}

function init() {
  content.style.overflowY = 'auto';

  const style = document.createElement('style');
  style.textContent = `
    ::-webkit-scrollbar {
      background: none;
    }
  `;
  document.querySelector('head').appendChild(style);

  // Для проверки закрытия соединения выбиваем собеседника через полминуты
  setTimeout(() => {
    conn.close(1000, 'Соединение закрыто по таймауту')
  }, 30000);
}