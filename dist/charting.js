/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/d3/d3.d.ts"/>
var charting;
(function (charting) {
    var chart = (function () {
        function chart(container) {
            this._group = d3.select(container).append('g');
        }
        chart.prototype.draw = function () {
            var scale = d3.scale.linear();
            var axis = d3.svg.axis();
            scale.range();
        };
        return chart;
    })();
})(charting || (charting = {}));
