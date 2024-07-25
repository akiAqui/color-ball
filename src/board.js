// board.js
import { BOARD_WIDTH, BOARD_HEIGHT } from './constants.js';

export class Board {
  constructor(p) {
    this.p = p;
    this.width = BOARD_WIDTH;
    this.height = BOARD_HEIGHT;
    this.theta = 0;
    this.omega = 0;
  }

  update(time, tilts) {
    const tilt = tilts[Math.floor(time)];
    this.theta = tilt.a;
    this.omega = tilt.z;
  }

  draw() {
    this.p.push();
    this.p.translate(this.p.width / 2, this.p.height / 2);
    this.p.rotate(this.theta);
    this.p.noFill();
    this.p.stroke(0);
    this.p.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    this.p.pop();
  }
}
