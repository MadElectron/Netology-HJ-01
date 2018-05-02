'use strict';

const signInHtm = document.querySelector('form.sign-in-htm');
const signUpHtm = document.querySelector('form.sign-up-htm');
const signInSubmit = signInHtm.querySelector('input[type="submit"');
const signUpSubmit = signUpHtm.querySelector('input[type="submit"');

  // const xhr = new XMLHttpRequest();
  // xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
  // xhr.send(requestData);

  // xhr.addEventListener('load', e => {
  //   console.log(xhr.responseJSON);
  // })
  // xhr.addEventListener('error', e => {
  //   console.error(xhr.responseJSON);
  // })

signInHtm.addEventListener('submit', event => {
  const formData = new FormData(event.target);
  
  const requestData = {};
  [...formData.entries()].forEach(e => {
    requestData[e[0]] = e[1];
  });
  
  console.log(JSON.stringify(requestData));


  fetch('https://neto-api.herokuapp.com/signin', {
      body: requestData,
      credentials: 'same-origin',
      method: 'POST',

    })
    .then(res => console.log(res.name)) //res.name
    .catch(err => console.error(err.message));
});

signUpHtm.addEventListener('submit', event => {
  const formData = new FormData(event.target);
  
  const requestData = {};
  [...formData.entries()].forEach(e => {
    requestData[e[0]] = e[1];
  });
  
  console.log(JSON.stringify(requestData));

  // const xhr = new XMLHttpRequest();
  // xhr.open('POST', 'https://neto-api.herokuapp.com/signup');
  // xhr.setRequestHeader('Content-Type', 'application/json')
  // xhr.send(JSON.stringify(requestData));

  // xhr.addEventListener('loadend', e => {
  //   console.log(xhr.responseJSON);
  // })
  // xhr.addEventListener('error', e => {
  //   console.error(xhr.responseJSON);
  // })

  fetch('https://neto-api.herokuapp.com/signup', {
      body: JSON.stringify(requestData),
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((res) => {
      if (200 <= res.status && res.status < 300) {
      return res;
      }
      throw new Error(response.statusText);
      })
    .then(res => console.log(JSON.stringify(res))) //res.name
    .catch(err => console.error(err.message));
});
