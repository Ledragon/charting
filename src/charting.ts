/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/d3/d3.d.ts"/>
/// <reference path="./reddit.d.ts"/>
/// <reference path="./xAxis.ts"/>
/// <reference path="./yAxis.ts"/>
module charting {
	export class chart {
		private _group: D3.Selection;
		private _paddingLeft = 50;
		private _paddingBottom = 30;
		private _paddingTop = 30;
		private _height: number;

		private _xAxis: xAxis;
		private _yAxis: yAxis;

		private _dataGroup: D3.Selection;

		constructor(container: any) {
			this.init(container);
			this.update();
		}

		private init(container) {
			var selection = d3.select(container);
			var width = selection.node().clientWidth;
			var height = selection.node().clientHeight;
			this._height = height;
			this._group = selection.append('svg')
				.attr({
					'width': width,
					'height': height
				})
				.append('g');

			this._xAxis = new xAxis(this._group, width);
			this._xAxis.translate(this._paddingLeft, (this._height - this._paddingBottom));
			this._yAxis = new yAxis(this._group, (height - this._paddingBottom - this._paddingTop));
			this._yAxis.translate(this._paddingLeft, this._paddingTop);

			this._dataGroup = this._group.append('g')
				.classed('data', true)
				.attr({
					'transform': 'translate(' + 0 + ',' + this._paddingTop + ')'
				});
		}

		private update() {
			d3.json('http://api.reddit.com/', (error, data: reddit.redditObject) => {
				var children = data.data.children;

				var minDate = new Date(new Date(0).setSeconds(d3.min(children, c=> c.data.created)));
				var maxDate = new Date(new Date(0).setSeconds(d3.max(children, c=> c.data.created)));
				this._xAxis.update(minDate, maxDate);
				var xScale = this._xAxis.scale();


				var minScore = d3.min(children, c=> c.data.score);
				var maxScore = d3.max(children, c=> c.data.score);
				this._yAxis.update(minScore, maxScore);
				var yScale = this._yAxis.scale();
				
				var dataSelection = this._dataGroup
					.selectAll('.post')
					.data(children);
				
				dataSelection.enter()
					.append('circle')
					.classed('post', true);

				dataSelection.attr({
					'r': 4,
					'cx': (d: reddit.redditChild, i) => xScale(new Date(0).setSeconds(d.data.created)),
					'cy': (d: reddit.redditChild, i) => yScale(d.data.score),
					'transform': 'translate(' + this._paddingLeft + ',' + 0 + ')'
				});
				
				dataSelection.exit().remove();
			});
		}
	}
}