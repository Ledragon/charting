/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/d3/d3.d.ts"/>
/// <reference path="./reddit.d.ts"/>
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
            this.draw(width, height);
        };
        chart.prototype.draw = function (width, height) {
            this.drawXAxis(width);
            this.drawYAxis(height);
        };
        chart.prototype.drawXAxis = function (width) {
            var scale = d3.time.scale();
            this._xScale = scale;
            var endDate = new Date(2015, 0, 0);
            var beginDate = new Date(2014, 0, 0);
            scale.domain([beginDate, endDate]);
            scale.range([0, width - this._paddingLeft]);
            this._xAxis = d3.svg.axis().scale(scale).orient('bottom');
            this._xAxisGroup = this._group.append('g').call(this._xAxis).attr({
                'transform': 'translate(' + this._paddingLeft + ',' + (this._height - this._paddingBottom) + ')'
            });
        };
        chart.prototype.drawYAxis = function (height) {
            this._yScale = d3.scale.linear();
            this._yScale.domain([0, 1]);
            this._yScale.range([height - this._paddingBottom, this._paddingTop]);
            this._yAxis = d3.svg.axis().scale(this._yScale).orient('left');
            this._yAxisGroup = this._group.append('g').call(this._yAxis).attr({
                'transform': 'translate(' + this._paddingLeft + ', 0)'
            });
        };
        chart.prototype.update = function () {
            var _this = this;
            d3.json('http://api.reddit.com/', function (error, data) {
                var children = data.data.children;
                var minDate = new Date(new Date(0).setSeconds(d3.min(children, function (c) { return c.data.created; })));
                var maxDate = new Date(new Date(0).setSeconds(d3.max(children, function (c) { return c.data.created; })));
                _this._xScale.domain([minDate, maxDate]);
                _this._xAxisGroup.call(_this._xAxis);
                var minScore = d3.min(children, function (c) { return c.data.score; });
                var maxScore = d3.max(children, function (c) { return c.data.score; });
                _this._yScale.domain([minScore, maxScore]);
                _this._yAxisGroup.call(_this._yAxis);
                var dataGroup = _this._group.append('g');
                dataGroup.selectAll('.post').data(children).enter().append('circle').classed('post', true).attr({
                    'r': 2,
                    'cx': function (d, i) { return _this._xScale(new Date(0).setSeconds(d.data.created)); },
                    'cy': function (d, i) { return _this._yScale(d.data.score); },
                    'transform': 'translate(' + _this._paddingLeft + ',' + 0 + ')'
                });
            });
        };
        return chart;
    })();
    charting.chart = chart;
})(charting || (charting = {}));
