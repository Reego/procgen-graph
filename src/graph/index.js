import React, { useEffect, useState } from 'react';

import Graph from './procedural/graph';

import GridPanel from './components/gridPanel';
import SidePanel from './components/sidePanel';

import style from './index.module.css';

const GraphApp = ({ width = 100, height = 100 }) => {

	const [ graph, setGraph ] = useState(new Graph());
	const [ layers, setLayers ] = useState([]);

	const [ updatingGraph, setUpdatingGraph ] = useState(false);
	const [ changed, setChanged ] = useState(false);

	const [ popup, setPopup ] = useState(null);

	/*
	 * Updates layers
	 */

	const addLayer = (layerType) => {
		const layer = new layerType();
		const updatedLayers = [...layers];
		updatedLayers.push(layer);
		setLayers(updatedLayers);
	};
	const removeLayer = (layer) => {
		const updatedLayers = [...layers];
		let index = updatedLayers.indexOf(layer);
		if(index >= 0) {
			updatedLayers.splice(index, 1);
			setLayers(updatedLayers);
		}
	};

	const onGraphChange = () => {
		setChanged(true);
	};

	const addRemoveActions = { addLayer, removeLayer, setPopup };

	const updateGraph = () => {
		if(setChanged) {
			setUpdatingGraph(true);
			graph.updateGraph(layers);
			setUpdatingGraph(false);
		}
	};

	return (
		<React.Fragment>
			{ popup !== null &&
				popup
			}
			<div className={ style.gridAppWrap }>
				<SidePanel hasPopup={ popup !== null } graph={ graph } layers={ layers } actions={ addRemoveActions }/>
				<GridPanel { ...{ graph, updateGraph, updatingGraph } }/>
			</div>
		</React.Fragment>
	);
};

export default GraphApp;