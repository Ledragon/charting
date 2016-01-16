/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/d3/d3.d.ts"/>
/// <reference path="./reddit.d.ts"/>
/// <reference path="./dataPoint.d.ts"/>
/// <reference path="./xAxis.ts"/>
/// <reference path="./yAxis.ts"/>
module charting {
    export class chart {
        private _container: D3.Selection;
        private _group: D3.Selection;
        private _paddingLeft = 50;
        private _paddingBottom = 30;
        private _paddingTop = 30;
        private _height: number;
        private _ratio = 3 / 4;

        private _xAxis: xAxis;
        private _yAxis: yAxis;

        private _dataGroup: D3.Selection;

        constructor(container: any) {
            this.init(container);
        }

        private init(container) {
            var selection = d3.select(container);
            this._container = selection;
            var width = selection.node().clientWidth;
            var svg = selection.append('svg');
            this._group = svg
                .append('g');

            this._xAxis = new xAxis(this._group, width);
            this._xAxis.translate(this._paddingLeft, (this._height - this._paddingBottom));
            this._yAxis = new yAxis(this._group, 1);
            this._yAxis.translate(this._paddingLeft, this._paddingTop);

            this._dataGroup = this._group.append('g')
                .classed('data', true)
                .attr({
                    'transform': 'translate(' + 0 + ',' + this._paddingTop + ')'
                });
            this.resize();
            d3.select(window)
                .on('resize', () => {
                    this.resize();
                });
        }

        private resize() {
            var width = this._container.node().clientWidth;
            var height = this._ratio * width;
            this._container.select('svg')
                .attr({
                    'width': width,
                    'height': height
                });
            this._height = height;
            this._xAxis.resize(width, height);
            this._xAxis.translate(this._paddingLeft, (this._height - this._paddingBottom));
            this._yAxis.resize(width, height - this._paddingBottom - this._paddingTop);
            this._dataGroup
                .selectAll('.post')
                .attr({
                    'r': 4,
                    'cx': (d: any, i) => this._xAxis.scale()(d.date),
                    'cy': (d: any, i) => this._yAxis.scale()(d.value)
                });
        }

        private onMouseover(): (d, i) => void {
            return (d, i) => {
                d3.select(d3.event.currentTarget)
                    .style({
                        'fill': 'yellow'
                    });
                this.logData(d);
            }
        }

        private onMouseout(): (d, i) => void {
            return (d, i) => {
                d3.select(d3.event.currentTarget).style({
                    'fill': ''
                });
                this.logData(d);
            }
        }

        private logData(d: any) {
            console.log(d);
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
                .on('mouseover', this.onMouseover())
                .on('mouseout', this.onMouseout());

            dataSelection.attr({
                'r': 4,
                'cx': (d: any, i) => xScale(d.date),
                'cy': (d: any, i) => yScale(d.value),
                'transform': 'translate(' + this._paddingLeft + ',' + 0 + ')'
            });

            dataSelection.exit().remove();
        }

        ratio(value?: number): number | chart {
            if (arguments) {
                this._ratio = 1/value;
                this.resize();
                return this;
            }
            return this._ratio;
        }
    }
}