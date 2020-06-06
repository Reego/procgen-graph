import Layer from './layer';

import { SimpleNumber, Toggle } from '../parameters/parameters';

import {
	Color,
} from '../utils';

/** 
 * Produces a radial gradient
 */

class RadialGradient extends Layer {

	constructor(id)
	{
		super(id);

		this.parameters.sourceOpacity = new SimpleNumber(0, 'Source Opacity', 0, 1, .01);
		this.parameters.edgeOpacity = new SimpleNumber(0, 'Edge Opacity', 0, 1, .01);
		this.parameters.targetDensity = new SimpleNumber(0, 'Density', 0, 1, .01);
		this.parameters.distanceExponent = new SimpleNumber(1, 'Distance Exponent', 0, 5);
		this.parameters.originX = new SimpleNumber(1, 'Origin X', 0, 10000, 1);
		this.parameters.originY = new SimpleNumber(1, 'Origin X', 0, 10000, 1);
		this.parameters.radius = new SimpleNumber(1, 'Radius');
	}

	recalculate(node) {
		const distance = Math.pow(Math.pow(this.parameters.originX.value - node.x, 2) + Math.pow(this.parameters.originY.value - node.y, 2), .5);

		if(distance <= this.parameters.radius.value) {

			/// Linearly interpolate between source and edge opacity
			const opacityProp = Math.pow(distance / this.parameters.radius.value, this.parameters.distanceExponent.value);
			const totalOpacity = (1 - opacityProp) * this.parameters.sourceOpacity.value + opacityProp * this.parameters.edgeOpacity.value;
			const nodeOpacity = 1 - totalOpacity;

			if(node.x === 500 && node.y === 500) {
				console.log(nodeOpacity, totalOpacity, opacityProp);
			}

			const targetDensity = this.parameters.targetDensity.value;
			node.density = node.density * nodeOpacity + targetDensity * totalOpacity;
		}
	}

	static getLabel() {
		return "Radial Gradient";
	}
}

/** 
 * Produces a linear gradient
 */

class LinearGradient extends Layer {

	constructor(id)
	{
		super(id);

		this.parameters.sourceOpacity = new SimpleNumber(0, 'Source Opacity', 0, 1, .01);
		this.parameters.edgeOpacity = new SimpleNumber(0, 'Edge Opacity', 0, 1, .01);
		this.parameters.targetDensity = new SimpleNumber(0, 'Density', 0, 1, .01);
		this.parameters.distanceExponent = new SimpleNumber(1, 'Distance Exponent', 0, 5);
		this.parameters.originX = new SimpleNumber(1, 'Origin X', 0, 10000, 1);
		this.parameters.originY = new SimpleNumber(1, 'Origin X', 0, 10000, 1);
		this.parameters.gradientDirectionX = new SimpleNumber(1, 'Gradient Direction X', -100, 100, .1);
		this.parameters.gradientDirectionY = new SimpleNumber(1, 'Gradient Direction Y', -100, 100, .1);
		this.parameters.maxProjectionLength = new SimpleNumber(1, 'Max Projection Length');
	}

	setup() {
		const dirX = this.parameters.gradientDirectionX.value;
		const dirY = this.parameters.gradientDirectionY.value;
		const gradientDirectionMagnitude = Math.sqrt(dirX * dirX + dirY * dirY);
		if(gradientDirectionMagnitude !== 0 ) {
			this.unitDirectionX = dirX / gradientDirectionMagnitude;
			this.unitDirectionY = dirY / gradientDirectionMagnitude;
		}
		else {
			this.unitDirectionX = 0;
			this.unitDirectionY = 0;
		}
	}

	recalculate(node) {
		const distance = Math.pow(this.parameters.originX.value - node.x, 2) + Math.pow(this.parameters.originY.value - node.y, 2);

		const diffX = this.parameters.originX.value - node.x;
		const diffY = this.parameters.originY.value - node.y;

		const projection = Math.abs(diffX * this.unitDirectionX + diffY * this.unitDirectionY);

		// if(node.x % 33 === 0 && node.y % 333 === 0) {
		// 	console.log(projection);
		// }

		if(projection < this.parameters.maxProjectionLength.value) {
			const opacityProp = Math.pow(projection / this.parameters.maxProjectionLength.value, this.parameters.distanceExponent.value);
			const totalOpacity = (1 - opacityProp) * this.parameters.sourceOpacity.value + opacityProp * this.parameters.edgeOpacity.value;
			const nodeOpacity = 1 - totalOpacity;

			node.density = node.density * nodeOpacity + opacityProp * this.parameters.targetDensity.value;
		}
	}

	static getLabel() {
		return "Linear Gradient";
	}
}

export {
	RadialGradient,
	LinearGradient,
};