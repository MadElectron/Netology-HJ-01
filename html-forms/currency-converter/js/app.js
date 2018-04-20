const content = document.getElementById('content');
const preloader = document.getElementById('loader');
const sourceInput =  document.getElementById('source');
const output = document.getElementById('result');
const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
let data;

const source = 'https://neto-api.herokuapp.com/currency';
const xhr = new XMLHttpRequest();

preloader.classList.remove('hidden');
xhr.open('GET', source, true);
xhr.send();

xhr.addEventListener('loadend', () => {
  const data = JSON.parse(xhr.responseText);

  data.forEach(el => {
    const optionHTML = `<option value="${el.value}" title="${el.title}">${el.code}` 
    from.innerHTML += optionHTML;
    to.innerHTML += optionHTML;
  });


  fromSelect.addEventListener('change', calculate);
  toSelect.addEventListener('change', calculate);
  sourceInput.addEventListener('change', calculate);

  content.classList.remove('hidden');
  preloader.classList.add('hidden');

  calculate();
});

function calculate() {
  output.innerText = (sourceInput.value * 
    fromSelect.value / toSelect.value).toFixed(2);
}
