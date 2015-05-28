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
		}

		draw() {
			var scale = d3.scale.linear();

			scale.domain([0, 100]);
			scale.range([0, 1]);
			var axis = d3.svg.axis();
			this._group.call(axis);
		}
	}
}