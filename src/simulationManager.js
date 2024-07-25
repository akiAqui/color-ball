// simulationManager.js
import { Ball } from './ball.js';
import { Board } from './board.js';
import { N, BOARD_WIDTH, BOARD_HEIGHT } from './constants.js';

export class SimulationManager {
  constructor(p) {
    this.p = p;
    this.debugMode = true;
    this.time = 0;
    this.board = new Board(p);
    this.balls = Array(N).fill().map(() => new Ball(p));
    this.setInitialPositions();
    this.setInitialVelocities();
    this.setColors();
    this.tilts = this.interpolateTilts();
    this.debugBallIndex = 0;
  }

  setInitialPositions() {
    this.balls.forEach(ball => {
      ball.x = this.p.random(-BOARD_WIDTH / 2, BOARD_WIDTH / 2);
      ball.y = this.p.random(-BOARD_HEIGHT / 2, BOARD_HEIGHT / 2);
    });
  }

  setInitialVelocities() {
    this.balls.forEach(ball => {
      ball.vx = this.p.random(-10, 10);
      ball.vy = this.p.random(-10, 10);
    });
  }

  setColors() {
    this.balls.forEach(ball => {
      ball.color = this.p.color(this.p.random(255), this.p.random(255), this.p.random(255));
    });
  }

  interpolateTilts() {
    const tiltDefinitions = {
      "0.0":   {"a": 0.00, "z":  0},
      "3.0":   {"a": 0.22, "z": -0.2},
      "9.0":   {"a": 1.00, "z":  1.1},
      "10.00": {"a": 1.25, "z": -0.3}
    };

    const times = Object.keys(tiltDefinitions).map(Number);
    const maxTime = Math.max(...times);
    const tilts = [];

    for (let t = 0; t <= maxTime; t += 0.016) {
      let prevTime = times.filter(time => time <= t).pop();
      let nextTime = times.filter(time => time > t)[0];

      if (prevTime === undefined) prevTime = 0;
      if (nextTime === undefined) nextTime = maxTime;

      const prevTilt = tiltDefinitions[prevTime.toFixed(1)];
      const nextTilt = tiltDefinitions[nextTime.toFixed(1)];

      const factor = (t - prevTime) / (nextTime - prevTime);

      tilts.push({
        a: prevTilt.a + (nextTilt.a - prevTilt.a) * factor,
        z: prevTilt.z + (nextTilt.z - prevTilt.z) * factor
      });
    }

    return tilts;
  }

  update() {
    this.time += 0.016;
    this.board.update(this.time, this.tilts);
    this.balls.filter(ball => ball.alive).forEach(ball => ball.update(this.board));

    if (this.debugMode) {
      this.debugOutput();
    }
  }

  draw() {
    this.board.draw();
    this.balls.filter(ball => ball.alive).forEach(ball => ball.draw());
  }

  debugOutput() {
    this.showTime();
    this.debugBall();
    this.debugBoard();
  }

  showTime() {
    console.log(`Simulation time: ${this.time.toFixed(2)}s`);
  }

  debugBall() {
    const ball = this.balls[this.debugBallIndex];
    console.log(`Ball ${this.debugBallIndex}:`);
    console.log(`  Position: (${ball.x.toFixed(2)}, ${ball.y.toFixed(2)})`);
    console.log(`  Velocity: (${ball.vx.toFixed(2)}, ${ball.vy.toFixed(2)})`);
    console.log(`  Acceleration: (${ball.ax.toFixed(2)}, ${ball.ay.toFixed(2)})`);
    console.log(`  Color: ${ball.color}`);
    console.log(`  Alive: ${ball.alive}`);
  }

  debugBoard() {
    console.log(`Board:`);
    console.log(`  Theta: ${this.board.theta.toFixed(2)}`);
    console.log(`  Omega: ${this.board.omega.toFixed(2)}`);
  }
}
