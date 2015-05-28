/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/d3/d3.d.ts"/>
module charting {
	class chart {
		private _group: D3.Selection;

		constructor(container: any) {
			this._group = d3.select(container).append('g');
		}

		draw() {
			var scale = d3.scale.linear();
			var axis = d3.svg.axis();
			scale.range();
		}
	}
}