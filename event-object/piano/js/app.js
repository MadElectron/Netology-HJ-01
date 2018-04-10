const set = document.getElementsByClassName('set')[0];
const keys = set.getElementsByTagName('li');
const sounds = ['first', 'second', 'third', 'fourth', 'fifth'];

Array.from(keys).forEach((key, index) => {
  const audio = key.getElementsByTagName('audio')[0];

  key.addEventListener('click', (event) => {
    let tone;

    if (event.shiftKey) {
      tone = 'lower';
    } else if (event.altKey) {
      tone = 'higher'
    } else {
      tone = 'middle';
    }

    audio.src = `sounds/${tone}/${sounds[index]}.mp3`;
    audio.currentTime = 0;
    audio.play();
  });
});;

document.addEventListener('keydown', (event) => {
  if (event.shiftKey) {
    set.classList.remove('middle', 'higher');
    set.classList.add('lower');
  } else if (event.altKey) {
    set.classList.remove('middle', 'lower');
    set.classList.add('higher');
  }
});

document.addEventListener('keyup', () => {
  set.classList.remove('lower', 'higher');
  set.classList.add('middle');
});