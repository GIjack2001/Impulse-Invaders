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

let lives = 1;
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

const play = () => {
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
            //set up restart functionality
            const restart = document.getElementById('restart');
            restart.addEventListener('click', () => {
              board.removeChild(document.getElementById('killScreen'));
              lives = 1;
              missileCounter = 0;
              score = 0;
              const allMissiles = board.getElementsByClassName('shot');
              const allMeteors = board.getElementsByClassName('meteor');
              while (allMissiles[0]) {
                allMissiles[0].parentNode.removeChild(allMissiles[0]);
              }
              while (allMeteors[0]) {
                allMeteors[0].parentNode.removeChild(allMeteors[0]);
              }
              Object.keys(missiles).forEach((key) => delete missiles[key]);
              Object.keys(meteors).forEach((key) => delete meteors[key]);
              play();
            });
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

  let PACE = 50;
  let varpace = 50;
  const generateMeteors = window.setInterval(() => {
    // varpace = Math.floor(Math.random() * (65 - 10) + 10);
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
  }, PACE * varpace);
};

functions.startGame();
const start = document.getElementById('start');
start.addEventListener('click', () => {
  board.removeChild(document.getElementById('killScreen'));
  lives = 1;
  missileCounter = 0;
  score = 0;
  play();
});
