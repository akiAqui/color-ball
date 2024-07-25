import { GRAVITY, ROLLING_FRICTION_COEFFICIENT } from './constants.js';
import p5 from 'p5';

export class Ball {
    constructor(p, radius, color, x, y, boardSoftness) {
	this.p = p;
	this.radius = radius;
	this.color = color;
	this.position = p.createVector(x, y);
	this.velocity = p.createVector(0, 0);
	this.acceleration = p.createVector(0, 0);
	this.mass = Math.PI * radius * radius; // 質量を半径の二乗に比例させる
	this.alive = true;
	this.penWidth = this.calculatePenWidth(boardSoftness);
    }
    
    calculatePenWidth(boardSoftness) {
	// 板の柔らかさを考慮したペンの太さの計算
	return this.radius * Math.sqrt(this.mass * boardSoftness);
    }
    
    applyForce(force) {
	let f = p5.Vector.div(force, this.mass);
	this.acceleration.add(f);
    }
    
    update(dt) {
	if (!this.alive) return;
	
	this.velocity.add(p5.Vector.mult(this.acceleration, dt));
	this.position.add(p5.Vector.mult(this.velocity, dt));
	this.acceleration.set(0, 0);
    }
    
    draw() {
	if (!this.alive) return;
	
	fill(this.color);
	this.p.noStroke();
	ellipse(this.position.x, this.position.y, this.radius * 2);
    }
    
    drawTrail(prevPosition) {
	if (!this.alive) return;
	
	this.p.stroke(this.color);
	this.p.strokeWeight(this.penWidth);
	this.p.line(prevPosition.x, prevPosition.y, this.position.x, this.position.y);
    }
}
