'use strict'

const plane = document.getElementById('acSelect');
const btnSeatMap = document.getElementById('btnSeatMap');
const btnSetFull = document.getElementById('btnSetFull');
const btnSetEmpty = document.getElementById('btnSetEmpty');
const seatMapTitle = document.getElementById('seatMapTitle');
const seatMapDiv = document.getElementById('seatMapDiv');

const totalPax = document.getElementById('totalPax');
const totalHalf = document.getElementById('totalHalf');
const totalAdult = document.getElementById('totalAdult');

let data;

function init() {
  const url = `https://neto-api.herokuapp.com/plane/${plane.value}`;
  btnSeatMap.disabled = 'disabled';

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      data = json;
      seatMapTitle.textContent = `${data.title} (${data.passengers} пассажиров)`;

      seatMapDiv.innerText = '';
      btnSeatMap.removeAttribute('disabled');
      btnSetFull.disabled = 'disabled';
      btnSetEmpty.disabled = 'disabled';

      totalPax.textContent = data.passengers;
      totalAdult.textContent = 0;
      totalHalf.textContent = 0;
    });
}

function appendRow(number, letters) {
  const template = {
    className: 'row seating-row text-center',
    children: [
      {
        className: 'col-xs-1 row-number',
        children: [
          {
            tag: 'h2',
            className: '',
            textContent: number
          }
        ]
      },
    ]
  };

  if (letters) {
    template.children.push(
      {
        className: 'col-xs-5',
        children: letters.slice(0, letters.length / 2).map(letter => createSeatTemplate(letter))
      });
    template.children.push(
      {
        className: 'col-xs-5',
        children: letters.slice(letters.length / 2, letters.length).map(letter => createSeatTemplate(letter))
      });
  }

  seatMapDiv.append(createNode(template));
}

function createSeatTemplate(letter) {
  return {
    className: 'col-xs-4 seat',
    children: [
      {
        tag: 'span',
        className: 'seat-label',
        textContent: letter
      }
    ]
  };
}

function createNode(el) {
  const tag = el.tag === undefined ? 'div' : el.tag;
  const node = document.createElement(tag);

  node.className = el.className;

  if (el.children !== undefined) {
    el.children.forEach(child => {
      const childNode = createNode(child);
      node.appendChild(childNode);
    });
  }

  if (el.textContent !== undefined) {
    node.textContent = el.textContent;
  }

  return node;
}

btnSeatMap.addEventListener('click', evt => {
  evt.preventDefault();  

  data.scheme.forEach((v, k) =>{
    const number = k + 1;
    let letters = null;
    
    if (v) {
      letters = v === 6 ? data.letters6 : data.letters4;
    }

    appendRow(number, letters);
  });

  btnSetFull.removeAttribute('disabled');
  btnSetEmpty.removeAttribute('disabled');

  const seats = document.querySelectorAll('.seat');
  [...seats].forEach(seat => {
    seat.addEventListener('click', evt => {
      evt.preventDefault();
      const className = evt.altKey ? 'half' : 'adult';
      evt.currentTarget.classList.add(className);
    });
  });
});

btnSetFull.addEventListener('click', evt => {
  evt.preventDefault();

  const seats = document.querySelectorAll('.seat');
  [...seats].forEach(seat => {
    seat.classList.remove('half');
    seat.classList.add('adult');
  });
});

btnSetEmpty.addEventListener('click', evt => {
  evt.preventDefault();
  
  const seats = document.querySelectorAll('.seat');
  [...seats].forEach(seat => {
    seat.classList.remove('adult', 'half');
  });
});


plane.addEventListener('change', init);

btnSeatMap.disabled = 'disabled';
btnSetFull.disabled = 'disabled';
btnSetEmpty.disabled = 'disabled';

init();

// @TODO: clear seat on click and change totals