/// <reference path="../typings/d3/d3.d.ts"/>
module charting{
	export class xAxis{
		
		private _scale: D3.Scale.TimeScale;
		private _group: D3.Selection;
		private _axis: D3.Svg.Axis;
		constructor(container: D3.Selection, width: number) {
			this.init(container, width);
		}
		
		private init(container:D3.Selection, width: number) {
			this._scale = d3.time.scale();
			this._scale.range([0, width]);
			this._axis = d3.svg.axis()
				.scale(this._scale)
				.orient('bottom');
			
			this._group = container.append('g');
			
			var endDate = new Date(2015,0,0);
			var beginDate = new Date(2014,0,0);
			this.update(beginDate, endDate)
		}
		
		translate(translateX: number, translateY:number) {
			this._group.attr({
				'transform': 'translate(' + translateX + ',' + translateY + ')'
			});
		}
		
		update(beginDate: Date, endDate: Date) {
			this._scale.domain([beginDate, endDate]);
			this._group.call(this._axis);
		}
		
		scale() {
			return this._scale;
		}
	}
}