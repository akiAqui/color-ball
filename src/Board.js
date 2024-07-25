import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants.js';
import p5 from 'p5';

export class Board {
    constructor(p,width, height) {
	this.p = p;
	this.width = width;
	this.height = height;
	this.angleX = 0;
	this.angleY = 0;
	this.targetAngleX = 0;
	this.targetAngleY = 0;
	this.rotationSpeed = 0.1;
    }
    
    setTargetAngles(targetTime, angleX, angleY) {
	this.targetAngleX = angleX;
	this.targetAngleY = angleY;
	// 角速度の計算は省略（実際の実装では必要）
    }
    
    update(dt) {
	this.angleX += (this.targetAngleX - this.angleX) * this.rotationSpeed * dt;
	this.angleY += (this.targetAngleY - this.angleY) * this.rotationSpeed * dt;
    }
    
    draw() {
	this.p.push();
	this.p.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
	this.p.rotateX(this.angleX);
	this.p.rotateY(this.angleY);
	this.p.fill(200);
	this.p.rect(-this.width / 2, -this.height / 2, this.width, this.height);
	this.p.pop();
    }
    
    getNormal() {
	return this.p.createVector(
	    Math.sin(this.angleY),
	    -Math.sin(this.angleX),
	    Math.cos(this.angleX) * Math.cos(this.angleY));
    }
}
