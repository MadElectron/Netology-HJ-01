'use strict';

const content = document.querySelector('.content');

function loadData(url, callback) {
  return new Promise((done, fail) => {
    const script = document.createElement('script');
    script.src = `${url}?callback=${callback}`;
    document.body.appendChild(script);
  });
}


loadData('https://neto-api.herokuapp.com/profile/me', 'appendProfileData')
  .then(appendProfileData);
  

function appendProfileData(data) {
  console.log(data)

  Object.entries(data).forEach((prop) => {

    const [key, value] = prop;
    const node = document.querySelector(`*[data-${key}]`);
    
    if (node) {
      if (node.tagName === 'IMG') {
        node.src = value;
      } else {
        node.textContent = value;
      }      
    }
  });

  loadData(`https://neto-api.herokuapp.com/profile/${data.id}/technologies`, 'appendTechnologiesData')
  .then(appendTechnologiesData);
}

function appendTechnologiesData(data) {
  console.log(data);

  const node = document.querySelector(`*[data-technologies]`);
  data.forEach(el => {
    const span = document.createElement('span');
    span.classList = `devicons devicons-${el}`;
    node.appendChild(span);
  })  

  displayContent();
}

function displayContent() {
  content.style.display = 'initial';
}