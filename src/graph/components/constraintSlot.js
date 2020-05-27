import React, { useState } from 'react';

import style from './style/sidePanel.module.css';

const ConstraintSlot = ({ constraint: constraintObject}) => {

	const [ constraint, _ ] = useState(constraintObject);

	const onParameterChange = (parameterIndex, newValue) => {
		constraint.parameters[parameterIndex].setValue(newValue);
	};

	const parameterComponents = [];
	for(let i = 0; i < constraint.parameters; i++) {
		parameterComponents.push(
			constraint.parameters[i].getComponent(() => onParameterChange(i))
		);
	}

	return (<div className={ style.constraintSlot }>
		<h1>{ constraint.constructor.name }</h1>
		{ parameterComponents }
	</div>);
};

export default ConstraintSlot;