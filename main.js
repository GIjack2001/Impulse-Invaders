import Spaceship from './scripts/spaceship.js';
import Missile from './scripts/missiles.js';
import functions from './scripts/functions.js';

//memory objects:
const missiles = {};
const meteors = {};

const BOARD_WIDTH = 1000;
const BOARD_HEIGHT = 500;

const xWing = new Spaceship(
  'https://assets.website-files.com/5cfa0a3c809181819a5fd8c2/607db2672488b89e92bba479_XWing.svg',
  450,
  150,
  false
);

//select board
const board = document.getElementById('board');
board.style.height = BOARD_HEIGHT;
board.style.width = BOARD_WIDTH;
//create box for xwings and sets initial position
const xWingsBox = document.createElement('img');
xWingsBox.setAttribute('src', xWing.url);
xWingsBox.setAttribute('class', 'spaceShip');
xWingsBox.style.left = xWing.x + 'px';
board.appendChild(xWingsBox);

// refresh xWing position
const moveXWing = () => {
  xWingsBox.style.left = xWing.x + 'px';
  //   console.log(xWing.x);
};

//use functions.create to create a new missile creator with counter in closure.
const missileCreator = functions.create(missiles);
const meteorCreator = functions.create(meteors);

// set commands
addEventListener('keydown', (e) => {
  if (e.key == 'ArrowRight' && xWing.x < BOARD_WIDTH - 100) {
    xWing.x += 50;
    moveXWing();
  }
  if (e.key == 'ArrowLeft' && xWing.x > 0) {
    xWing.x -= 50;
    moveXWing();
  }
  if (e.key == ' ' && xWing.x > 0) {
    console.log('Pewpew');
    const newMissile = new Missile(xWing.x, 10);
    const key = missileCreator(newMissile);
    newMissile.key = key;
    newMissile.toscreen();
    console.log(missiles);
  }
});

const updateObjects = window.setInterval(() => {
  if (Object.keys(missiles).length !== 0) {
    console.log('hello');
    for (const shot of Object.keys(missiles)) {
      missiles[shot].update();
      if (missiles[shot].y >= BOARD_HEIGHT) delete missiles[shot];
    }
  }
}, 30);
