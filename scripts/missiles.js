export default class Missile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toscreen() {
    const board = document.getElementById('board');
    const shot = document.createElement('div');
    shot.setAttribute('class', 'shot');
    shot.setAttribute('id', `missile${this.key}`);
    shot.style.left = this.x + 48 + 'px';
    shot.style.bottom = this.y + 'px';
    board.appendChild(shot);
    console.log('in toscreen ' + this.key);
  }
  update() {
    const shot = document.getElementById(`missile${this.key}`);
    if (this.y < 500) {
      this.y += 10;
      shot.style.bottom = this.y + 'px';
    }
  }
}
