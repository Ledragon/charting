/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/d3/d3.d.ts"/>
var charting;
(function (charting) {
    var chart = (function () {
        function chart(container) {
            this._paddingLeft = 30;
            this._paddingBottom = 30;
            this.init(container);
        }
        chart.prototype.init = function (container) {
            var selection = d3.select(container);
            var width = selection.node().clientWidth;
            var height = selection.node().clientHeight;
            this._height = height;
            this._group = selection.append('svg').attr({
                'width': width,
                'height': height
            }).append('g');
            this.draw(width, height);
        };
        chart.prototype.draw = function (width, height) {
            this.drawXAxis(width);
            this.drawYAxis(height);
        };
        chart.prototype.drawXAxis = function (width) {
            var scale = d3.scale.linear();
            scale.domain([0, 1]);
            scale.range([0, width - this._paddingLeft]);
            var xAxis = d3.svg.axis().scale(scale).orient('bottom');
            this._group.append('g').call(xAxis).attr({
                'transform': 'translate(' + this._paddingLeft + ',' + (this._height - this._paddingBottom) + ')'
            });
        };
        chart.prototype.drawYAxis = function (height) {
            var paddingLeft = 30;
            var scale = d3.scale.linear();
            scale.domain([0, 1]);
            scale.range([height - this._paddingBottom, 0]);
            var axis = d3.svg.axis().scale(scale).orient('left');
            this._group.append('g').call(axis).attr({
                'transform': 'translate(' + this._paddingLeft + ', 0)'
            });
        };
        return chart;
    })();
    charting.chart = chart;
})(charting || (charting = {}));
