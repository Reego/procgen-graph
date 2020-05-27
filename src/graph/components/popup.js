import React from 'react';

import {
	Layers,
	Constraints,
} from '../procedural/options';

import style from './style/popup.module.css';

const PopupOption = ({ optionLabel, onClick }) => <div className={ style.popupOption } onClick={ onClick }>{ optionLabel }</div>

const Popup = ({ title, onSelectOption, options, onClose }) => {

	const optionComponents = [];
	for(let i = 0; i < options.length; i++) {
		optionComponents.push(
			<PopupOption optionLabel={ options[i].getLabel() } onClick={ () => {
				onSelectOption(options[i]);
				onClose();
			} }/>
		);
	}

	return (
		<div className={ style.popup }>
			<div>
				<h1>{ title }</h1>
				{ optionComponents }
				<div className={ style.closePopup } onClick={ onClose }>Cancel</div>
			</div>
		</div>
	);
};

const CreateLayerPopup = ({ onSelectOption, onClose }) => <Popup title='New Layer' onSelectOption={ onSelectOption } options={ Layers } onClose={ onClose }/>

const CreateConstraintPopup = ({ onSelectOption, onClose }) => <Popup title='New Constraint' onSelectOption={ onSelectOption } options={ Constraints } onClose={ onClose }/>

export {
	CreateLayerPopup,
	CreateConstraintPopup,
};

export default Popup;