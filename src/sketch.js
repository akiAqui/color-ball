import p5 from 'p5';
import { SimulationManager } from './SimulationManager.js';
import {
    CANVAS_WIDTH, CANVAS_HEIGHT, BALL_COUNT, MIN_RADIUS, MAX_RADIUS,
    BOARD_SOFTNESS, DT
} from './constants.js';

new p5((p) => {
    let simulationManager;
    
    p.setup = () => {
	p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	simulationManager = new SimulationManager(p,
						  BALL_COUNT,
						  MIN_RADIUS,
						  MAX_RADIUS,
						  BOARD_SOFTNESS);
    };
    
    p.draw = () => {
	p.background(220);
	simulationManager.update(DT);
	simulationManager.draw();
    };
});
