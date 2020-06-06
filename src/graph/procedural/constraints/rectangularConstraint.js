import Constraint from './constraint';

import {
	SimpleNumber,
	Toggle
} from '../parameters/parameters';

class RectangularConstraint extends Constraint {

	constructor(id) {
		super(id);
		this.parameters = {
			x: new SimpleNumber(0, 'Left Corner X'),
			y: new SimpleNumber(0, 'Top Corner Y'),
			width: new SimpleNumber(0, 'Width'),
			height: new SimpleNumber(0, 'Height'),
			inverted: new Toggle(false, 'Inverted'),
		}
	}

	checkNode(node) {
		const xCorner = this.parameters.x.value;
		const yCorner = this.parameters.y.value;

		const inside = node.x >= xCorner && node.x <= xCorner + this.parameters.width.value && 
			node.y >= yCorner && node.y <= yCorner + this.parameters.height.value;

		return (this.parameters.inverted.value) ? !inside : inside;
	}

	static getLabel() {
		return 'Rectangular';
	}
}

export {
	RectangularConstraint,
};