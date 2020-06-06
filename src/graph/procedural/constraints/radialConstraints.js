import Constraint from './constraint';

import {
	SimpleNumber,
	Toggle,
} from '../parameters/parameters';

class RadialConstraint extends Constraint {

	constructor(id) {
		super(id);
		this.parameters = {
			x: new SimpleNumber(0, 'Vertex X'),
			y: new SimpleNumber(0, 'Vertex Y'),
			radius: new SimpleNumber(0, 'Radius'),
			inverted: new Toggle(false, 'Inverted'),
		}
	}

	checkNode(node) {
		const diffx = node.x - this.parameters.x.value;
		const diffy = node.y - this.parameters.y.value;
		const radius = this.parameters.radius.value;

		const inside = diffx * diffx + diffy * diffy <= radius * radius;
		return (this.parameters.inverted.value) ? !inside : inside;
	}

	static getLabel() {
		return 'Radial';
	}
}

export {
	RadialConstraint,
};