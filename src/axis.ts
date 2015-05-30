/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/d3/d3.d.ts"/>
module charting {
	export class chart {
		private _group: D3.Selection;

		constructor(container: any) {
			this.init(container);
		}
		
		private init(container) {
			this._group = d3.select(container).append('g');
			this.draw();
		}

		draw() {
			this.drawXAxis();
			this.drawYAxis();
		}
		
		private drawXAxis() {
			var scale = d3.scale.linear();

			scale.domain([0, 1]);
			scale.range([0, 600]);
			var xAxis = d3.svg.axis()
				.scale(scale)
				.orient('bottom');
			this._group.append('g').call(xAxis);
			
		}
		private drawYAxis() {
			var scale = d3.scale.linear();

			scale.domain([0, 1]);
			scale.range([800, 0]);
			var axis = d3.svg.axis()
				.scale(scale)
				.orient('left');
			this._group.append('g')
				.call(axis)
				.attr({
				'transform': 'translate(30 0)'
			});
			
		}
	}
}