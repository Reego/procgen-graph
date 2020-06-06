import { Color } from './utils';

const INITIAL_DENSITY = .5;

/** 
 * Handles the graph generation / display and serves as a node container
 */

class Graph {

	constructor() {

		this.currentColor = 'rgba(0,0,0,1)';
		this.nodes = [];
		this._idCount = 0;
	}

	get idCount() {
		this._idCount++;
		return this._idCount - 1;
	}

	setupNodes(width, height)
	{
		console.log(width, height);
		this.nodes = [];
		for(let i = 0; i < width; i++) {
			for(let g = 0; g < height; g++) {
				const x = i, y = g;
				this.nodes.push({
					x,
					y,
					density: 0,
					color: new Color(),
				});
			}
		}
	}

	updateGraph(layers) {
		
		const canvas = document.getElementById('graphCanvas');

		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		if(this.nodes.length !== canvas.offsetWidth * canvas.offsetHeight) {
			this.setupNodes(canvas.offsetWidth, canvas.offsetHeight);
		}

		if(this.canvasContext === undefined) {
			this.canvasContext = document.getElementById('graphCanvas').getContext('2d');
		}

		this.canvasContext.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

		let nodeIndex = 0;
		let updateInterval = null;

		for(let i = 0; i < layers.length; i++) {
			layers[i].setup();
		}

		for(let g = 0; g < this.nodes.length; g++) {
			const node = this.nodes[g];
			node.density = 0;
			node.color = new Color();
			for(let i = 0; i < layers.length; i++) {
				layers[i].processNode(node);
			}
			this.display(node);
		}

		// updateInterval = setInterval(processNode, 1);
	}

	display(node) {
		this.fillPixel(node.x, node.y, node.color.toString());
	}

	fillPixel(x, y, color)
	{
		if(color !== this.currentColor) {
			this.currentColor = color;
			this.canvasContext.fillStyle = this.currentColor;
		}
		this.canvasContext.fillRect(x, y, 1, 1);
	}
}

export default Graph;