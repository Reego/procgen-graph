import Constraint from './constraint';

import {
	SimpleInteger,
} from '../parameters/parameters';

class RadialConstraint extends Constraint {

	constructor() {
		super();
		this.parameters = {
			x: new SimpleInteger(0, 'Vertex X'),
			y: new SimpleInteger(0, 'Vertex Y'),
			radius: new SimpleInteger(0, 'Radius'),
		}
	}

	checkNode(node) {
		const diffx = node.x - this.parameters.x.value;
		const diffy = node.y - this.parameters.y.value;
		const radius = this.parameters.radius.value;

		return diffx * diffx + diffy * diffy <= radius * radius;
	}

	static getLabel() {
		return 'Radial';
	}
}

export {
	RadialConstraint,
};