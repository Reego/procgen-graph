import Layer from './layer';

import {
	SimpleNumber
} from '../parameters/parameters';

import {
	Color,
} from '../utils';

/** 
 * Produces a random result on the node
 */

class RandomLayer extends Layer {

	constructor(id)
	{
		super(id);

		this.parameters.opacity = new SimpleNumber(0, 'Opacity', 0, 1, .1);
	}

	recalculate(node) {
		const opacity = this.parameters.opacity.value;
		if(node.x === 0 && node.y === 0) {
			console.log(opacity);
			console.log((node.density * (1 - opacity)) + opacity * Math.random());
		}
		node.density = (node.density * (1 - opacity)) + opacity * Math.random();
	}

	static getLabel() {
		return 'Random Layer';
	}
}

/** 
 * Rounds the density of the node
 */

class RoundingLayer extends Layer {

	recalculate(node) {
		node.density = Math.round(node.density);
	}

	static getLabel() {
		return 'Rounding Layer';
	}
}

/** 
 * Rounds the density of the node
 */

class SquaringLayer extends Layer {

	recalculate(node) {
		node.density = node.density * node.density;
	}

	static getLabel() {
		return 'Squaring Layer';
	}
}

/** 
 * Rounds the density of the node
 */

class SolidLayer extends Layer {

	constructor(id) {
		super(id);

		this.parameters.density = new SimpleNumber(0, 'Density', 0, 1, .01);
		this.parameters.opacity = new SimpleNumber(1, 'Opacity', 0, 1, .01);
	}

	recalculate(node) {
		const opacity = this.parameters.opacity.value;
		node.density = node.density * (1 - opacity) + opacity * this.parameters.density.value;
	}

	static getLabel() {
		return 'Solid Layer';
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
		return 'GrayScale Layer';
	}
}

export {
	RandomLayer,
	RoundingLayer,
	SquaringLayer,
	SolidLayer,
	TestLayer,
};