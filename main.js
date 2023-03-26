import Spaceship from './scripts/spaceship.js';
import Missile from './scripts/missiles.js';
import functions from './scripts/functions.js';
import Meteor from './scripts/meteors.js';
//import Star from './scripts/stars.js';

//memory objects:
const missiles = {};
const meteors = {};
const stars = {};
export default stars;

let lives = 3;
let missileCounter = 0;
let score = 0;

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
board.style.height = BOARD_HEIGHT + 'px';
board.style.width = BOARD_WIDTH + 'px';
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
  if (e.key == ' ') {
    console.log('Pewpew');
    const newMissile = new Missile(xWing.x, 10);
    const key = missileCreator(newMissile);
    newMissile.key = key;
    newMissile.toscreen();
    console.log(missiles);
  }
});

//game refresher function
const updateObjects = window.setInterval(() => {
  //create stars to give impression of movment
  functions.star(BOARD_HEIGHT, BOARD_WIDTH);

  if (Object.keys(missiles).length !== 0) {
    console.log('hello');
    for (const shot of Object.keys(missiles)) {
      missiles[shot].update();
      // check if missile hits border
      if (missiles[shot].y >= BOARD_HEIGHT) {
        document
          .getElementById('board')
          .removeChild(document.getElementById(`missile${shot}`));
        delete missiles[shot];
      }
    }
  }
  if (Object.keys(meteors).length !== 0) {
    for (const meteor of Object.keys(meteors)) {
      meteors[meteor].update();
      // check if meteor hits border
      if (meteors[meteor].y <= 0) {
        lives--;
        console.log('lives ' + lives);
        if (lives === 0) {
          clearInterval(updateObjects);
          functions.gameOver(score);
        }
        document
          .getElementById('board')
          .removeChild(document.getElementById(`meteor${meteor}`));
        delete meteors[meteor];
      }
      // check if missile hits meteor
      for (const shot of Object.keys(missiles)) {
        if (
          missiles[shot].y >= meteors[meteor].y &&
          missiles[shot].y < meteors[meteor].y + 50 &&
          missiles[shot].x >= meteors[meteor].x - 50 &&
          missiles[shot].x <= meteors[meteor].x
        ) {
          score++;
          console.log(
            'hit - missile y ' +
              missiles[shot].x +
              '  meteor y ' +
              meteors[meteor].x
          );
          console.log('stars ' + Object.keys(stars).length);
          //delete missile and meteor from object and board
          document
            .getElementById('board')
            .removeChild(document.getElementById(`missile${shot}`));
          delete missiles[shot];
          document
            .getElementById('board')
            .removeChild(document.getElementById(`meteor${meteor}`));

          delete meteors[meteor];
          console.log('new missiles ' + JSON.stringify(missiles));
          console.log('new meteors ' + JSON.stringify(meteors));
        }
      }
    }
  }
}, 30);

let PACE = 100;
const generateMeteors = window.setInterval(() => {
  if (lives === 0) {
    clearInterval(generateMeteors);
  }
  console.log('Meteor incoming!');
  const newMeteor = new Meteor(
    'https://assets.website-files.com/5cfa0a3c809181819a5fd8c2/60814ef1cc0a9e60933fcdfc_Atom%20%20Cookie%20%20Illu.svg',
    Math.floor(Math.random() * (BOARD_WIDTH - 50)),
    BOARD_HEIGHT
  );
  const key = meteorCreator(newMeteor);
  newMeteor.key = key;
  newMeteor.toscreen();
  console.log(meteors);
}, PACE * 50);
