/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/d3/d3.d.ts"/>
/// <reference path="./reddit.d.ts"/>
/// <reference path="./dataPoint.d.ts"/>
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
        }

        private init(container) {
            var selection = d3.select(container);
            var width = selection.node().clientWidth;
            var height = selection.node().clientHeight;
            if (!height) {
                height = 3 / 4 * width;
            }
            this._height = height;
            var svg = selection.append('svg')
                .attr({
                    'width': width,
                    'height': height
                });
            this._group = svg
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

            d3.select(window).on('resize', () => {
                var width = selection.node().clientWidth;
                var height = 3 / 4 * width;
                svg.attr({
                    'width': width,
                    'height': height
                });
                this._height = height;
                this._xAxis.resize(width, height);
            this._xAxis.translate(this._paddingLeft, (this._height - this._paddingBottom));
            });
        }

        update(data: Array<dataPoint>) {
            var minDate = d3.min(data, (d: any) => d.date);
            var maxDate = d3.max(data, (d: any) => d.date);
            var xScale = this._xAxis.update(minDate, maxDate);

            var minScore = d3.min(data, (d: any) => d.value);
            var maxScore = d3.max(data, (d: any) => d.value);
            var yScale = this._yAxis.update(minScore, maxScore);

            var dataSelection = this._dataGroup
                .selectAll('.post')
                .data(data);

            dataSelection.enter()
                .append('circle')
                .classed('post', true)
                .on('mouseover', this.onMouseover());

            dataSelection.attr({
                'r': 4,
                'cx': (d: any, i) => xScale(d.date),
                'cy': (d: any, i) => yScale(d.value),
                'transform': 'translate(' + this._paddingLeft + ',' + 0 + ')'
            });

            dataSelection.exit().remove();
        }

        private onMouseover(): (d, i) => void {
            return (d, i) => {
                d3.select(d3.event.currentTarget).style({
                    'fill': 'yellow'
                });
                this.logData(d);
            }
        }

        private logData(d: any) {
            console.log(d);
        }
    }
}