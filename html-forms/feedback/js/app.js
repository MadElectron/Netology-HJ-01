const form = document.querySelector('.contentform');
const fields = form.querySelectorAll('input, textarea');
const submit = document.querySelector('.button-contact');
const zip = document.querySelector('input[name="zip"]');
const output = document.getElementById('output');

Array.from(fields).forEach(field => {
  field.addEventListener('change', () => {
    submit.disabled = checkAllFilled() ? false : 'disabled';
  });
});

zip.addEventListener('keydown', event =>{
  if (isPrintableNonDigit(event.keyCode)) {
    event.preventDefault();
  } 
});

form.addEventListener('submit', event => {
  event.preventDefault();
  event.target.classList.add('hidden');
  output.classList.remove('hidden');

  Array.from(fields).forEach(field => {
    const name = field.getAttribute('name');
    const outputNode = document.getElementById(name);

    if (outputNode){
      outputNode.innerText = field.value;
    }
  });
});

function checkAllFilled() {
  for(const field of Array.from(fields)) {
    if (!field.value) return false;
  }
  return true;
}

function isPrintableNonDigit(code) {
  return (code >= 65 && code <= 90) || // letters
    (code >= 106 && code <= 111) ||    // math operations
    code === 61 || code === 173 ||     // - and = btns
    code === 59 ||                     // ; btn
    code === 32 ||                     // spacebar
    code >= 186;                       // punctuation
}