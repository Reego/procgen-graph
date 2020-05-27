import React, { useEffect, useState } from 'react';

import style from './style/gridPanel.module.css';

const Graph = ({ graph }) => {

	return (
		<canvas id='graphCanvas' className={ style.graph } height={ graph.height } width={ graph.width }/>
	)
};

const GridPanel = ({ graph, updateGraph, updatingGraph }) => {

	return <div className={ style.gridPanel }>
		<div className={ style.generateButton } onClick={ updateGraph }>Generate</div>
		{ !updatingGraph &&
			<Graph graph={ graph }/>
		}
	</div>
}

export default GridPanel;