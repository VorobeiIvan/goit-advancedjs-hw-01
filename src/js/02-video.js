import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player', {
  id: 236203659,
  width: 640,
});

player.on(
  'timeupdate',
  throttle(function (data) {
    const currentTime = data.seconds;
    saveCurrentTime(currentTime);
  }, 1000)
);

const currentTimeKey = 'videoplayer-current-time';

function saveCurrentTime(time) {
  localStorage.setItem(currentTimeKey, time);
}

function loadCurrentTime() {
  const currentTime = localStorage.getItem(currentTimeKey);
  if (currentTime) {
    return parseFloat(currentTime);
  }
  return 0;
}

const savedTime = loadCurrentTime();

player.setCurrentTime(savedTime);
