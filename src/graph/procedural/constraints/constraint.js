/**
 * Abstract base calss for constraints
 * used to confined the layer 
 */

class Constraint {

	constructor(id) {

		if(this.constructor == Constraint) {
			throw new Error("Class is abstract and thus cannot be instantiated");
		}

		this.id = id;

		this.label = this.constructor.getLabel();
	}

	checkNode(node) {
		return true;
	}

	static getLabel() {
		throw new Error("Unimplemented Constraint label getter property");
	}
}

export default Constraint;