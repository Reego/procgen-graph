import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';

import GraphApp from './graph/index';
import Home from './home/index';

import './app.css';

const App = () => (
	<Router>
		<Switch>
			<Route><GraphApp/></Route>
		</Switch>
	</Router>
);

export default App;