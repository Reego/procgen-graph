import React, { useState, useEffect } from 'react';

import style from './style/sidePanel.module.css';

import {
	CreateLayerPopup,
	CreateConstraintPopup,
} from './popup';

const Layer = ({ i, layer: layerState, hasPopup, popupOnClose, setPopup, removeLayer }) => {

	const [ layer, setLayer ] = useState(layerState);
	const [ constraints, setConstraints ] = useState([]);
	const [ hidden, setHidden ] = useState(false);

	/// Layer parameters

	const layerParameterComponents = [];
	for(let g = 0; g < layer.parameters.length; g++) {
		const parameter = layer.parameters[g];
		layerParameterComponents.push(
			parameter.getComponent()
		);
	}

	/// Constraints

	/// Adding Constraints

	const addConstraint = (constraintType, layer) => {
		const constraint = new constraintType();
		const updatedConstraints = [...layer.constraints];
		updatedConstraints.push(constraint);
		setConstraints(updatedConstraints);
		layer.constraints = updatedConstraints;
	};

	const trySetConstraintPopup = () => {
		if(!hasPopup) {
			setPopup(
				<CreateConstraintPopup onSelectOption={ (constraintType) => addConstraint(constraintType, layer) } onClose={ popupOnClose }/>
			);
		}
	};

	/// Removing Constraints

	const removeConstraint = (constraint) => {
		const updatedConstraints = [...layer.constraints];
		let index = updatedConstraints.indexOf(constraint);
		if(index >= 0) {
			updatedConstraints.splice(index, 1);
		}
		setConstraints(updatedConstraints);
		layer.constraints = updatedConstraints;
	};

	const constraintComponents = [];
	for(let g = 0; g < layer.constraints.length; g++) {
		const constraint = layer.constraints[g];
		const constraintParameterComponents = [];

		for(const [ key, value ] of Object.entries(constraint.parameters)) {
			constraintParameterComponents.push(
				value.getComponent()
			);
		}

		constraintComponents.push(
			<div className={ style.constraint } key={ g }>
				<div className={ style.removeConstraintButton } onClick={ () => removeConstraint(constraint) }>x</div>
				<h1>{ constraint.label }</h1>
				<div className={ style.constraintParameters }>
					{ constraintParameterComponents }
				</div>
			</div>
		);
	}

	return (
	<div className={ style.layer } key={ i }>
		<div className={ style.removeLayerButton } onClick={ () => removeLayer(layer) }>x</div>
		<h1 onClick={ () => {
			setHidden(!hidden);
		} }>{ layer.label }</h1>
		{ !hidden &&
		<React.Fragment>
			<div className={ style.constraintsWrap }>
				<div>
					{ constraintComponents }
				</div>
				<div className={ style.addConstraintButton } onClick={ () => trySetConstraintPopup(layer) }>Add Constraint</div>
			</div>
			<div className={ style.layerParameters }>
				{ layerParameterComponents }
			</div>
		</React.Fragment>
		}
	</div>
	);
};

const SidePanel = ({ hasPopup, layers, constraints, actions }) => {

	const popupOnClose = () => actions.setPopup(null);

	const trySetLayerPopup = () => {
		if(!hasPopup) {
			actions.setPopup(
				<CreateLayerPopup onSelectOption={ actions.addLayer } onClose={ popupOnClose }/>
			);
		}
	};

	/// Handle Layers

	const layerComponents = [];
	for(let i = 0; i < layers.length; i++) {
		const layer = layers[i];
		layerComponents.push(
			<Layer {... { i, layer, hasPopup, popupOnClose, setPopup: actions.setPopup, removeLayer: actions.removeLayer, } }/>
		);
	}

	return (
		<div className={ style.sidePanel }>
			<div className={ style.layersWrap }>
				{ layerComponents }
				<div className={ style.addLayerButton } onClick={ trySetLayerPopup }>Add Layer</div>
			</div>
		</div>
	);
};

export default SidePanel;