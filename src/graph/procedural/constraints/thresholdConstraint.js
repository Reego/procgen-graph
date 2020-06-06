import Constraint from './constraint';

import {
	SimpleNumber,
	Toggle,
} from '../parameters/parameters';

class ThresholdConstraint extends Constraint {

	constructor(id) {
		super(id);
		this.parameters = {
			boundA: new SimpleNumber(0, 'Bound 1', 0, 1, .01);
			boundB: new SimpleNumber(1, 'Bound 2', 0, 1, .01);
			withinBounds: new Toggle(false, 'Within Bounds');
		}
	}

	checkNode(node) {

		const min = Math.min(this.parameters.boundA.value, this.parameters.boundB.value);
		const max = Math.max(this.paremeters.boundA.value, this.pamameters.boundB.value);

		if(withinBounds) {
			return node.density >= min && node.density <= max;
		}
		return node.density <= min || node.density >= max;
	}

	static getLabel() {
		return "Bounded Constraint";
	}
}