/// <reference path="../typings/d3/d3.d.ts"/>
var charting;
(function (charting) {
    var xAxis = (function () {
        function xAxis(container, width) {
            this.init(container, width);
        }
        xAxis.prototype.init = function (container, width) {
            this._scale = d3.time.scale();
            this._scale.range([0, width]);
            this._axis = d3.svg.axis().scale(this._scale).orient('bottom');
            this._group = container.append('g');
            var endDate = new Date(2015, 0, 0);
            var beginDate = new Date(2014, 0, 0);
            this.update(beginDate, endDate);
        };
        xAxis.prototype.translate = function (translateX, translateY) {
            this._group.attr({
                'transform': 'translate(' + translateX + ',' + translateY + ')'
            });
        };
        xAxis.prototype.update = function (beginDate, endDate) {
            this._scale.domain([beginDate, endDate]);
            this._group.call(this._axis);
        };
        xAxis.prototype.scale = function () {
            return this._scale;
        };
        return xAxis;
    })();
    charting.xAxis = xAxis;
})(charting || (charting = {}));
/// <reference path="../typings/d3/d3.d.ts"/>
var charting;
(function (charting) {
    var yAxis = (function () {
        function yAxis(container, height) {
            this.init(container, height);
        }
        yAxis.prototype.init = function (container, height) {
            this._scale = d3.scale.linear();
            this._scale.range([height, 0]);
            this._axis = d3.svg.axis().scale(this._scale).orient('left');
            this._group = container.append('g');
            this.update(0, 1);
        };
        yAxis.prototype.translate = function (translateX, translateY) {
            this._group.attr({
                'transform': 'translate(' + translateX + ',' + translateY + ')'
            });
        };
        yAxis.prototype.update = function (min, max) {
            this._scale.domain([min, max]);
            this._group.call(this._axis);
        };
        yAxis.prototype.scale = function () {
            return this._scale;
        };
        return yAxis;
    })();
    charting.yAxis = yAxis;
})(charting || (charting = {}));
/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/d3/d3.d.ts"/>
/// <reference path="./reddit.d.ts"/>
/// <reference path="./xAxis.ts"/>
/// <reference path="./yAxis.ts"/>
var charting;
(function (charting) {
    var chart = (function () {
        function chart(container) {
            this._paddingLeft = 50;
            this._paddingBottom = 30;
            this._paddingTop = 30;
            this.init(container);
            this.update();
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
            this._xAxis = new charting.xAxis(this._group, width);
            this._xAxis.translate(this._paddingLeft, (this._height - this._paddingBottom));
            this._yAxis = new charting.yAxis(this._group, (height - this._paddingBottom - this._paddingTop));
            this._yAxis.translate(this._paddingLeft, this._paddingTop);
            this._dataGroup = this._group.append('g').classed('data', true).attr({
                'transform': 'translate(' + 0 + ',' + this._paddingTop + ')'
            });
        };
        chart.prototype.update = function () {
            var _this = this;
            d3.json('http://api.reddit.com/', function (error, data) {
                var children = data.data.children;
                var minDate = new Date(new Date(0).setSeconds(d3.min(children, function (c) { return c.data.created; })));
                var maxDate = new Date(new Date(0).setSeconds(d3.max(children, function (c) { return c.data.created; })));
                _this._xAxis.update(minDate, maxDate);
                var xScale = _this._xAxis.scale();
                var minScore = d3.min(children, function (c) { return c.data.score; });
                var maxScore = d3.max(children, function (c) { return c.data.score; });
                _this._yAxis.update(minScore, maxScore);
                var yScale = _this._yAxis.scale();
                var dataSelection = _this._dataGroup.selectAll('.post').data(children);
                dataSelection.enter().append('circle').classed('post', true);
                dataSelection.attr({
                    'r': 4,
                    'cx': function (d, i) { return xScale(new Date(0).setSeconds(d.data.created)); },
                    'cy': function (d, i) { return yScale(d.data.score); },
                    'transform': 'translate(' + _this._paddingLeft + ',' + 0 + ')'
                });
                dataSelection.exit().remove();
            });
        };
        return chart;
    })();
    charting.chart = chart;
})(charting || (charting = {}));
