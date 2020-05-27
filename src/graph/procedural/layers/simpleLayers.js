import Layer from './layer';

import {
	Color,
} from '../utils';

/** 
 * Produces a random result on the node
 */

class RandomLayer extends Layer {

	recalculate(node) {
		node.density = Math.random()
	}

	static getLabel() {
		return "Random Layer";
	}
}

/** 
 * For testing
 */

class TestLayer extends Layer {

	recalculate(node) {
		const colorValue = node.density * 255;
		node.color = new Color(colorValue, colorValue, colorValue, 1);
	}

	static getLabel() {
		return "Test Layer";
	}
}

export {
	TestLayer,
	RandomLayer,
};