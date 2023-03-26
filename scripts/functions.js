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
  window.alert('Game Over - Score : ' + score);
};
