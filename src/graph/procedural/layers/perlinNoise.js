import Perlin from '../perlin';

import Layer from './layer';

import { SimpleNumber } from '../parameters/parameters';

import {
	Color,
} from '../utils';

/** 
 * Produces a random result on the node
 */

class PerlinNoise extends Layer {

	constructor(id)
	{
		super(id);

		this.parameters.scale = new SimpleNumber(1, 'Scale', 1);
		this.parameters.octaves = new SimpleNumber(1, 'Octaves', 1, 8);
		this.parameters.lacunarity = new SimpleNumber(1, 'Lacunarity', 0, 1, .01);
		this.parameters.persistence = new SimpleNumber(1, 'Peristence', 0, 1, .01);
	}

	recalculate(node) {
		const x = node.x;
		const y = node.y;
		const scale = this.parameters.scale.value;
		const octaves = this.parameters.octaves.value;
		const lacunarity = this.parameters.lacunarity.value;
		const persistence = this.parameters.persistence.value;
		// node.density = Perlin.get(node.x / scale, node.y  / scale) + .5;

		let total = 0;
		let frequency = 1 / scale;
		let amplitude = 1;
		let maxValue = 0;

		for(let i = 0; i < octaves; i++) {
			total += (Perlin.get(x * frequency, y * frequency) + .5) * amplitude;
			
			maxValue += amplitude;
			
			amplitude *= persistence;
			frequency *= lacunarity;
		}
		node.density = total / maxValue;
	}

	static getLabel() {
		return "Perlin Noise";
	}
}
export {
	PerlinNoise,
};