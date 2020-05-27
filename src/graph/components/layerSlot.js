import React, { useState } from 'react';

import style from './style/sidePanel.module.css';

const LayerSlot = ({ layer: layerObject}) => {

	const [ layer, _ ] = useState(layerObject);

	const onParameterChange = (parameterIndex, newValue) => {
		layer.parameters[parameterIndex].setValue(newValue);
	};

	const parameterComponents = [];
	for(let parameter of layer.parameters) {
		parameterComponents.push(
			parameter.getComponent();
		);
	}

	return (<div className={ style.layerSlot }>
		<h1>{ layer.constructor.name }</h1>
		{ parameterComponents }
	</div>);
};

export default LayerSlot;