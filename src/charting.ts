/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/d3/d3.d.ts"/>
/// <reference path="./reddit.d.ts"/>
/// <reference path="./xAxis.ts"/>
module charting {
	export class chart {
		private _group: D3.Selection;
		private _paddingLeft = 50;
		private _paddingBottom = 30;
		private _paddingTop = 30;
		private _height: number;
		
		private _xAxis: xAxis;
		
		private _yScale: D3.Scale.LinearScale;
		private _yAxisGroup: D3.Selection;
		private _yAxis: D3.Svg.Axis;
		
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
						'height':height
					})	
					.append('g');
			
				this._xAxis = new xAxis(this._group, width);
				this._xAxis.translate(this._paddingLeft, (this._height - this._paddingBottom));
			
			this.draw(width, height);
		}

		draw(width: number, height: number) {
			this.drawYAxis(height);
		}
		
		private drawYAxis(height: number) {
			this._yScale = d3.scale.linear();

			this._yScale.domain([0, 1]);
			this._yScale.range([height-this._paddingBottom, this._paddingTop]);
			this._yAxis = d3.svg.axis()
				.scale(this._yScale)
				.orient('left');
			this._yAxisGroup= this._group.append('g')
				.call(this._yAxis)
				.attr({
				'transform': 'translate('+this._paddingLeft+', 0)'
			});
		}
		
		private update() {
			d3.json('http://api.reddit.com/', (error, data: reddit.redditObject) => {
				var children = data.data.children;
				
				var minDate =new Date(new Date(0).setSeconds(d3.min(children, c=> c.data.created)));
				var maxDate = new Date(new Date(0).setSeconds(d3.max(children, c=> c.data.created)));
				this._xAxis.update(minDate, maxDate);
				var xScale = this._xAxis.scale();  
				
				
				var minScore = d3.min(children, c=> c.data.score);
				var maxScore = d3.max(children, c=> c.data.score);
				this._yScale.domain([minScore, maxScore]);
				this._yAxisGroup.call(this._yAxis);
				
				var dataGroup = this._group.append('g');
				dataGroup.selectAll('.post')
					.data(children)
					.enter()
					.append('circle')
					.classed('post', true)
					.attr({
					'r': 4,
					'cx':(d:reddit.redditChild,i)=>xScale(new Date(0).setSeconds(d.data.created)),
					'cy': (d: reddit.redditChild, i) => this._yScale(d.data.score),
					'transform':'translate('+this._paddingLeft+','+0+')'
				})
			});
		}
	}
}