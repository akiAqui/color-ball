import { Ball } from './Ball.js';
import { Board } from './Board.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT, GRAVITY, ROLLING_FRICTION_COEFFICIENT } from './constants.js';
import p5 from 'p5';

export class SimulationManager {
    constructor(p,ballCount, minRadius, maxRadius, boardSoftness) {
	this.p = p;	
	this.balls = [];
	this.board = new Board(this.p,CANVAS_WIDTH * 0.8, CANVAS_HEIGHT * 0.8);
	this.initializeBalls(ballCount, minRadius, maxRadius, boardSoftness);
	this.debugBallIndex = 0; // デバッグ用の球のインデックス
    }
    
    initializeBalls(count, minRadius, maxRadius, boardSoftness) {
	for (let i = 0; i < count; i++) {
	    const radius = Math.random(minRadius, maxRadius);
	    const x = Math.random(radius, CANVAS_WIDTH - radius);
	    const y = Math.random(radius, CANVAS_HEIGHT - radius);
	    const color = this.RandomColor();
	    this.balls.push(new Ball(this.p,radius, color, x, y, boardSoftness));
	}
    }
    
    RandomColor() {
	return this.p.color(Math.random(255), Math.random(255), Math.random(255));
    }
    
    update(dt) {
	this.board.update(dt);
	
	for (let ball of this.balls) {
	    if (!ball.alive) continue;
	    
	    const gravity = this.p.createVector(0, GRAVITY);
	    ball.applyForce(gravity);
	    
	    const normal = this.board.getNormal();
	    const frictionForce = this.calculateFrictionForce(ball, normal);
	    ball.applyForce(frictionForce);
	    
	    const prevPosition = ball.position.copy();
	    ball.update(dt);
	    
	    if (!this.isBallOnBoard(ball)) {
		ball.alive = false;
	    }
	    
	    ball.drawTrail(prevPosition);
	}
	
	this.debugOutput();
    }
    
    calculateFrictionForce(ball, normal) {
	const velocityAlongNormal = p5.Vector.dot(ball.velocity, normal);
	const velocityOnPlane = p5.Vector.sub(ball.velocity, p5.Vector.mult(normal, velocityAlongNormal));
	return p5.Vector.mult(velocityOnPlane, -ROLLING_FRICTION_COEFFICIENT * ball.mass * GRAVITY);
    }
    
    isBallOnBoard(ball) {
	// 簡易的な判定（実際にはより複雑な計算が必要）
	return ball.position.x > 0 && ball.position.x < CANVAS_WIDTH &&
            ball.position.y > 0 && ball.position.y < CANVAS_HEIGHT;
    }
    
    draw() {
	this.board.draw();
	for (let ball of this.balls) {
	    ball.draw();
	}
    }
    
    debugOutput() {
	const ball = this.balls[this.debugBallIndex];
	console.log(`Ball ${this.debugBallIndex}: ` +
                    `Position: (${ball.position.x.toFixed(2)}, ${ball.position.y.toFixed(2)}), ` +
                    `Velocity: (${ball.velocity.x.toFixed(2)}, ${ball.velocity.y.toFixed(2)}), ` +
                    `Alive: ${ball.alive}`);
    }
}
