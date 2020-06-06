/*
 * Layer Imports
 */

import {
	RandomLayer,
	RoundingLayer,
	SquaringLayer,
	SolidLayer,
	TestLayer,
} from './layers/simpleLayers';

import {
	PerlinNoise,
} from './layers/perlinNoise';

import {
	RadialGradient,
	LinearGradient,
} from './layers/gradients';

import {
	NaturalColorLayer,
	InvertColorLayer,
} from './layers/colorLayers';

/*
 * Constraint Imports
 */

import {
	RadialConstraint,
} from './constraints/radialConstraints';

import {
	RectangularConstraint,
} from './constraints/rectangularConstraint';

const Layers = [
	PerlinNoise,
	RandomLayer,
	RoundingLayer,
	SquaringLayer,
	RadialGradient,
	LinearGradient,
	SolidLayer,
	TestLayer,
	NaturalColorLayer,
	InvertColorLayer,
];

const Constraints = [
	RadialConstraint,
	RectangularConstraint,
];

export {
	Layers,
	Constraints,
};