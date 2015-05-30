/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/d3/d3.d.ts"/>
var charting;
(function (charting) {
    var chart = (function () {
        function chart(container) {
            this.init(container);
        }
        chart.prototype.init = function (container) {
            this._group = d3.select(container).append('g');
            this.draw();
        };
        chart.prototype.draw = function () {
            this.drawXAxis();
            this.drawYAxis();
        };
        chart.prototype.drawXAxis = function () {
            var scale = d3.scale.linear();
            scale.domain([0, 1]);
            scale.range([0, 600]);
            var xAxis = d3.svg.axis().scale(scale).orient('bottom');
            this._group.append('g').call(xAxis);
        };
        chart.prototype.drawYAxis = function () {
            var scale = d3.scale.linear();
            scale.domain([0, 1]);
            scale.range([800, 0]);
            var axis = d3.svg.axis().scale(scale).orient('left');
            this._group.append('g').call(axis).attr({
                'transform': 'translate(30 0)'
            });
        };
        return chart;
    })();
    charting.chart = chart;
})(charting || (charting = {}));
