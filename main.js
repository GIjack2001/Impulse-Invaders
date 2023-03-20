import Spaceship from './scripts/spaceship.js';

const xWing = new Spaceship(
  'https://assets.website-files.com/5cfa0a3c809181819a5fd8c2/607db2672488b89e92bba479_XWing.svg',
  150,
  150,
  false
);

const board = document.getElementById('board');
const xWingsBox = document.createElement('img');
xWingsBox.setAttribute('src', xWing.url);
xWingsBox.setAttribute('class', 'spaceShip');
xWingsBox.style.left = xWing.x + 'px';
board.appendChild(xWingsBox);

const moveXWing = () => {
  xWingsBox.style.left = xWing.x + 'px';
  console.log(xWing.x);
};

addEventListener('keydown', (e) => {
  if (e.key == 'ArrowRight' && xWing.x < 900) {
    xWing.x += 50;
    moveXWing();
  }
  if (e.key == 'ArrowLeft' && xWing.x > 0) {
    xWing.x -= 50;
    moveXWing();
  }
});
