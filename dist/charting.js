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
        };
        chart.prototype.draw = function () {
            var scale = d3.scale.linear();
            scale.domain([0, 100]);
            scale.range([0, 1]);
            var axis = d3.svg.axis();
            this._group.call(axis);
        };
        return chart;
    })();
    charting.chart = chart;
})(charting || (charting = {}));
