import React, { useState, useEffect } from 'react';

import style from './parameters.module.css';

const SimpleNumberComponent = ({ initialValue, parameterLabel, min, max, step, onChange}) => {

	const [ value, setValue ] = useState(initialValue);

	useEffect(() => {
		onChange(value);
	}, [value]);

	return (
	<div className={ style.parameter + ' ' + style.simpleNumber }>
		<label>{ parameterLabel }</label>
		<input type='number' required={true} defaultValue={ value } min={ min } max={ max } step={ step } onChange={
			(e) => {
				setValue(e.target.value);
			}
		}/>
	</div>);
};

class SimpleNumber {

	constructor(initialValue, label, min=0, max=100000, step=1) {
		this._value = initialValue;
		this.min = min;
		this.max = max;
		this.step = step;
		this.label = label;
	}

	get value()
	{
		return this._value;
	}

	setValue(newValue) {
		this._value = parseFloat(newValue);
	}

	getComponent(id) {
		const valueChangeCallback = (newValue) => {
			this.setValue(newValue);
		};
		return <SimpleNumberComponent key={ id } initialValue={ this._value } parameterLabel={ this.label } min={ this.min } max={ this.max } step={ this.step } onChange={ valueChangeCallback }/>
	}
}

export default SimpleNumber;