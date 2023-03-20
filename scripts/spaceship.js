export default class Spaceship {
  constructor(url, x, y, hit) {
    this.url = url;
    this.x = x;
    this.y = y;
    this.hit = hit;
  }
}
//url is img URL (spaceship sprite)
// x is lateral position
// y is currently not used
// hit shoud triggers gameover - currently not used
