/** 
 * Abstract base class for layers
 */

class Layer {

	constructor(id) {

		if(this.constructor == Layer) {
			throw new Error('Class is abstract and thus cannot be instantiated');
		}

		this.id = id;
		this._idCount = 0;

		this.label = this.constructor.getLabel();

		this.parameters = [
		];

		this.constraints = [];
	}

	get idCount() {
		return this._idCount++;
	}

	/**
	 * Defines node processing with confinements
	 * calls the layer's recalculate method if allowed
	 */

	setup() {
		for(let constraint of this.constraints) {
			constraint.setup();
		}
	}

	processNode(node) {

		let nodeIsAllowed = true;

		for(let constraint of this.constraints) {
			if(!constraint.checkNode(node)) {
				nodeIsAllowed = false;
				break;
			}
		}
		
		if(nodeIsAllowed) {
			this.recalculate(node);
		}
	}

	recalculate(node) {
		throw new Error('Unimplemented Layer recalculate method');
	}

	addConstraint(constraint) {
		this.constraints.push(constraint);
	}

	removeConstraint(constraint) {
		this.constraints.splice(this.constraints.indexOf(constraint), 1);
	}

	static getLabel() {
		throw new Error('Unimplemented Layer label getter property');
	}
}

export default Layer;