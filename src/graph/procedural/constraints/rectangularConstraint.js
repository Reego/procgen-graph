import Constraint from './constraint';

import {
	SimpleInteger,
	Toggle
} from '../parameters/parameters';

class RectangularConstraint extends Constraint {

	constructor(id) {
		super(id);
		this.parameters = {
			x: new SimpleInteger(0, 'Left Corner X'),
			y: new SimpleInteger(0, 'Top Corner Y'),
			width: new SimpleInteger(0, 'Width'),
			height: new SimpleInteger(0, 'Height'),
			inverted: new Toggle(false, 'Inverted'),
		}
	}

	checkNode(node) {
		const xCorner = this.parameters.x.value;
		const yCorner = this.parameters.y.value;

		const inside = node.x >= xCorner && node.x <= xCorner + this.parameters.width.value && 
			node.y >= yCorner && node.y <= yCorner + this.parameters.height.value;

		return (this.parameters.inverted.value && !inside) || inside;
	}

	static getLabel() {
		return 'Rectangular';
	}
}

export {
	RadialConstraint,
};