import Layer from './layer';

import {
	Color,
} from '../utils';

/** 
 * Produces a random result on the node
 */

class NaturalColorLayer extends Layer {

	COLORS = [
		{
			color: new Color(255, 255, 255, 1),
			minDensity: .97
		},
		{
			color: new Color(215, 215, 215, 1),
			minDensity: .9
		},
		{
			color: new Color(130, 130, 130, 1),
			minDensity: .83
		},
		{
			color: new Color(20, 150, 30, 1),
			minDensity: .63
		},
		{
			color: new Color(200, 210, 40, 1),
			minDensity: .55
		},
		{
			color: new Color(20, 40, 150, 1),
			minDensity: .3
		},
		{
			color: new Color(5, 20, 100, 1),
			minDensity: -1
		},
	];

	recalculate(node) {
		for(let colorData of this.COLORS) {
			if(node.density > colorData.minDensity) {
				const color = colorData.color;
				node.color = new Color(color.r, color.g, color.b, color.a);
				break;
			}
		}
	}

	static getLabel() {
		return "Natural Colors";
	}
}

/** 
 * Inverts the colors of existing nodes
 */

class InvertColorLayer extends Layer {

	recalculate(node) {
		node.color.r = 255 - node.color.r;
		node.color.g = 255 - node.color.g;
		node.color.b = 255 - node.color.b;
	}

	static getLabel() {
		return "Invert Colors";
	}
}

export {
	NaturalColorLayer,
	InvertColorLayer,
};