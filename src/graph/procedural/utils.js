function clamp(value, min, max) {
	return (value <= min) ? min : (value >= max) ? max : value;
}

/** 
 * Handles color
 */

class Color {

	constructor(r = 0, g = 0, b = 0, a = 1) {
		this._r = r;
		this._g = g;
		this._b = b;
		this._a = a;
	}

	set r(value) {
		this.r = clamp(value, 0, 255);
	}

	set g(value) {
		this.g = clamp(value, 0, 255);
	}

	set b(value) {
		this.b = clamp(value, 0, 255);
	}

	set a(value) {
		this.a = clamp(value, 0, 1);
	}

	get r() {
		return this._r;
	}

	get g() {
		return this._g;
	}

	get b() {
		return this._b;
	}

	get a() {
		return this._a;
	}

	toString() {
		return `rgba(${this._r},${this._g},${this._b},${this._a})`;
	}
}

export {
	Color,
};