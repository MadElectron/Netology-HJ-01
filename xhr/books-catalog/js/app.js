const source = 'https://neto-api.herokuapp.com/book/';
const content = document.getElementById('content');
const xhr = new XMLHttpRequest();
let data;

xhr.open('GET', source, true);
xhr.send();

xhr.addEventListener('loadend', () => {
  data = JSON.parse(xhr.responseText);
  content.innerHTML = '';

  console.log(data);

  data.forEach(book => {
    let li = document.createElement('li');
    let img =  document.createElement('img');
    
    li.dataset.title = book.title;
    li.dataset.author = book.author.name;
    li.dataset.info = book.info;
    li.dataset.price = book.price;
    img.src = book.cover.small;

    li.appendChild(img);
    content.appendChild(li);
  });

});

