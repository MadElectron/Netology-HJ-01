const slides = document.querySelectorAll('.slider li.slide');
const buttons = document.querySelectorAll('.slider-nav > a');
let actions = {};

Array.from(buttons).forEach(btn => {
  actions[btn.dataset.action] = btn;
});

slides[0].classList.add('slide-current');
setDisability();

Array.from(buttons).forEach(btn => {
  btn.addEventListener('click', event => {
    if (!event.target.classList.contains('disabled')) {
      const action = event.target.dataset.action;
      const current = document.querySelector('.slide.slide-current');

      current.classList.remove('slide-current');

      switch (action) {
        case 'prev':
          current.previousElementSibling.classList.add('slide-current');
          break;
        case 'next':
          current.nextElementSibling.classList.add('slide-current');
          break;
        case 'first':
          slides[0].classList.add('slide-current');
          break;
        case 'last':
          slides[slides.length-1].classList.add('slide-current');
          break;
      }

      setDisability();
    }
  });
});


function setDisability() {
  current = document.querySelector('.slide.slide-current');

  if (current.previousElementSibling === null) {
    actions['first'].classList.add('disabled');
    actions['prev'].classList.add('disabled');
  } else {
    actions['first'].classList.remove('disabled');
    actions['prev'].classList.remove('disabled');
  }

  if (current.nextElementSibling === null) {
    actions['last'].classList.add('disabled');
    actions['next'].classList.add('disabled');
  } else {
    actions['last'].classList.remove('disabled');
    actions['next'].classList.remove('disabled');
  }


}