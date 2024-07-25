// ball.js
import { G, R1, R2, K, BOARD_WIDTH, BOARD_HEIGHT } from './constants.js';

export class Ball {
  constructor(p) {
    this.p = p;
    this.radius = this.p.random(R1, R2);
    this.mass = (4 / 3) * Math.PI * Math.pow(this.radius, 3) * K;
    this.penWidth = this.radius * 2;
    this.color = this.p.color(this.p.random(255), this.p.random(255), this.p.random(255));
    this.alive = true;

    // ローカル座標系での位置、速度、加速度
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.vx = 0;
    this.vy = 0;
    this.vz = 0;
    this.ax = 0;
    this.ay = 0;
    this.az = 0;

    // 世界座標系での位置、速度、加速度
    this.s = 0;
    this.t = 0;
    this.u = 0;
    this.vs = 0;
    this.vt = 0;
    this.vu = 0;
    this.as = 0;
    this.at = 0;
    this.au = 0;
  }

  update(board) {
    if (!this.alive) return;

    const { theta, omega } = board;

    // 世界座標系での力の更新
    const fx = this.mass * G * Math.sin(omega) * Math.cos(theta);
    const fy = this.mass * G * Math.sin(omega) * Math.sin(theta);

    // 加速度の更新
    this.ax = fx / this.mass;
    this.ay = fy / this.mass;

    // 速度の更新
    this.vx += this.ax * DT;
    this.vy += this.ay * DT;

    // 位置の更新
    this.x += this.vx * DT;
    this.y += this.vy * DT;

    // 板の範囲から落ちる球の判定
    if (Math.abs(this.x) > BOARD_WIDTH / 2 || Math.abs(this.y) > BOARD_HEIGHT / 2) {
      this.alive = false;
    }
  }

  draw() {
    if (!this.alive) return;

    this.p.stroke(this.color);
    this.p.strokeWeight(this.penWidth);
    this.p.point(this.x + BOARD_WIDTH / 2, this.y + BOARD_HEIGHT / 2);
  }
}
