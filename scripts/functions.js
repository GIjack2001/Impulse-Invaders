import Star from './stars.js';
import stars from '../main.js';
const functions = {};
export default functions;

functions.create = (obj, counter = 0) => {
  return (item) => {
    obj[counter] = item;
    return counter++;
  };
};
functions.star = (height, width) => {
  const create = () => {
    const newStar = new Star(Math.floor(Math.random() * (width - 1)), height);
    stars[Object.keys(stars).length] = newStar;
    const board = document.getElementById('board');
    const star = document.createElement('div');
    star.setAttribute('class', 'star');
    star.setAttribute('id', `star${Object.keys(stars).length - 1}`);
    star.style.left = newStar.x + 'px';
    star.style.bottom = newStar.y + 'px';
    board.appendChild(star);
  };
  create();
  const update = () => {
    for (const etoile of Object.keys(stars)) {
      const star = document.getElementById(`star${etoile}`);
      if (stars[etoile].y > 0) {
        stars[etoile].y -= 5;
        star.style.bottom = stars[etoile].y + 'px';
      } else {
        delete stars[etoile];
        document
          .getElementById('board')
          .removeChild(document.getElementById(`star${etoile}`));
      }
    }
  };
  update();
};
functions.gameOver = (score) => {
  // window.alert('Game Over - Score : ' + score);
  const board = document.getElementById('board');
  const killScreen = document.createElement('div');
  killScreen.setAttribute('class', 'killScreen');
  killScreen.setAttribute('id', 'killScreen');
  const title = document.createElement('h1');
  title.setAttribute('class', 'gameOverTitle');
  title.innerText = 'GAME OVER';
  const story = document.createElement('p');
  story.setAttribute('class', 'gameOverParagraph');
  story.innerText =
    "Les cookies publicitaires ont triomphé. Mais les forces de la Bannière de Cookies n'abandonnent jamais !";
  const scoreText = document.createElement('h2');
  const restart = document.createElement('button');
  restart.setAttribute('class', 'restart');
  restart.setAttribute('id', 'restart');
  restart.innerText = 'Recommencer';
  scoreText.setAttribute('class', 'scoreText');
  scoreText.innerText = `Votre score : ${score}`;
  killScreen.appendChild(title);
  killScreen.appendChild(story);
  killScreen.appendChild(scoreText);
  killScreen.appendChild(restart);
  board.appendChild(killScreen);
};
functions.startGame = () => {
  const board = document.getElementById('board');
  const killScreen = document.createElement('div');
  killScreen.setAttribute('class', 'killScreen');
  killScreen.setAttribute('id', 'killScreen');
  const title = document.createElement('h1');
  title.setAttribute('class', 'gameOverTitle');
  title.innerText = 'IMPULSE INVADERS';
  const story = document.createElement('p');
  story.setAttribute('class', 'gameOverParagraph');
  story.innerText =
    "Dans un galaxie lointaine, très lointaine... Les maléfiques forces des cookies publicitaires lancent une vicieuse attaque contre le peuple du navigateur. Seules les forces de la Bannière de Cookies se tiennent sur leur route. Vous êtes un pilote d'élite de la Bannière. Saurez-vous les arrêter ?";

  const restart = document.createElement('button');
  restart.setAttribute('class', 'restart');
  restart.setAttribute('id', 'start');
  restart.innerText = "C'est parti !";
  killScreen.appendChild(title);
  killScreen.appendChild(story);
  killScreen.appendChild(restart);
  board.appendChild(killScreen);
};
