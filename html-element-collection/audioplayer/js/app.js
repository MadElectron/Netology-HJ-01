const tracks = ['LA Chill Tour', 'LA Fusion Jam', 'This is it band'];

const playerWrapper = document.getElementsByClassName('mediaplayer')[0]
const player = playerWrapper.getElementsByTagName('audio')[0];

const buttonsWrapper = playerWrapper.getElementsByClassName('buttons')[0];
const buttons = buttonsWrapper.getElementsByTagName('button');
const controls = {};

let currIndex = 0;
let title = playerWrapper.getElementsByClassName('title')[0];

Array.from(buttons).forEach(btn => {
  controls[btn.className] = btn;
});

function mp3Path(title) {
  return `mp3/${title}.mp3`;
}

player.src = mp3Path(tracks[0]);

controls.playstate.onclick = () => player.paused ? player.play() : player.pause();
controls.stop.onclick = () => {
  player.pause();
  player.currentTime = 0;
};
controls.back.onclick = () => {
  if (--currIndex == -1)
    currIndex += tracks.length;

  title.title = tracks[currIndex];
  player.src = mp3Path(tracks[currIndex]);
  player.play();
};
controls.next.onclick = () => {
  if (++currIndex == tracks.length)
    currIndex = 0;

  title.title = tracks[currIndex];
  player.src = mp3Path(tracks[currIndex]);
  player.play();
};
