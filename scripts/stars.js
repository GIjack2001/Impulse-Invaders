export default class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toscreen() {
    const board = document.getElementById('board');
    const meteor = document.createElement('img');
    meteor.setAttribute('class', 'meteor');
    meteor.setAttribute('id', `meteor${this.key}`);
    meteor.style.left = this.x + 'px';
    meteor.style.bottom = this.y + 'px';
    board.appendChild(meteor);
    console.log('in toscreen ' + this.key);
  }
  update() {
    const shot = document.getElementById(`meteor${this.key}`);
    if (this.y > 0) {
      this.y -= Math.floor((this.key + 1) / 10) + 1;
      shot.style.bottom = this.y + 'px';
    }
  }
}
