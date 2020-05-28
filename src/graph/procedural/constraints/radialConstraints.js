import Constraint from './constraint';

import {
	SimpleInteger,
	Toggle,
} from '../parameters/parameters';

class RadialConstraint extends Constraint {

	constructor(id) {
		super(id);
		this.parameters = {
			x: new SimpleInteger(0, 'Vertex X'),
			y: new SimpleInteger(0, 'Vertex Y'),
			radius: new SimpleInteger(0, 'Radius'),
			inverted: new Toggle(false, 'Inverted'),
		}
	}

	checkNode(node) {
		const diffx = node.x - this.parameters.x.value;
		const diffy = node.y - this.parameters.y.value;
		const radius = this.parameters.radius.value;

		const inside = diffx * diffx + diffy * diffy <= radius * radius;
		const isValid = (this.parameters.inverted.value && !inside) || inside;
		if((node.x === 0 && node.y === 0) || node.x === 500 && node.y === 500) {
			console.log(node.x, node.y);
			console.log(inside);
			console.log('INVERTED ' + this.parameters.inverted.value);
			console.log('FINAL ' + isValid);
		}
		return isValid;
	}

	static getLabel() {
		return 'Radial';
	}
}

export {
	RadialConstraint,
};