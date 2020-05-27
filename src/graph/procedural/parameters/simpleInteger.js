import React, { useState, useEffect } from 'react';

import style from './parameters.module.css';

const SimpleIntegerComponent = ({ initialValue, parameterLabel, onChange}) => {

	const [ value, setValue ] = useState(initialValue);

	useEffect(() => {
		onChange(value);
	}, [value]);

	return (
	<div className={ style.parameter + ' ' + style.simpleInteger }>
		<label>{ parameterLabel }</label>
		<input type='number' required={true} defaultValue={ value } onChange={
			(e) => {
				setValue(e.target.value);
			}
		}/>
	</div>);
};

class SimpleInteger {

	constructor(initialValue, label) {
		this._value = initialValue;
		this.label = label;
	}

	get value()
	{
		return this._value;
	}

	setValue(newValue) {
		this._value = parseInt(newValue);
	}

	getComponent() {
		const valueChangeCallback = (newValue) => {
			this.setValue(newValue);
		};
		return <SimpleIntegerComponent initialValue={ this._value } parameterLabel={ this.label } onChange={ valueChangeCallback }/>
	}
}

export default SimpleInteger;