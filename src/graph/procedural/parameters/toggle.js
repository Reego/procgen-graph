import React, { useState, useEffect } from 'react';

import style from './parameters.module.css';

const ToggleComponent = ({ initialValue, parameterLabel, onChange}) => {

	const [ value, setValue ] = useState(initialValue);

	useEffect(() => {
		onChange(value);
	}, [value]);

	return (
	<div className={ style.parameter + ' ' + style.toggle }>
		<label>{ parameterLabel }</label>
		<input type='checkbox' defaultValue={ value } onChange={
			(e) => {
				setValue(e.target.checked);
			}
		}/>
	</div>);
};

class Toggle {

	constructor(initialValue, label) {
		this._value = initialValue;
		this.label = label;
	}

	get value()
	{
		return this._value;
	}

	setValue(newValue) {
		this._value = newValue;
	}

	getComponent(id) {
		const valueChangeCallback = (newValue) => {
			this.setValue(newValue);
		};
		return <ToggleComponent key={ id } initialValue={ this._value } parameterLabel={ this.label } onChange={ valueChangeCallback }/>
	}
}

export default Toggle;