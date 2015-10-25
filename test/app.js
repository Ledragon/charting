var chart = new charting.chart('#test');

function update() {
    d3.json('http://api.reddit.com/', function (error, data) {
        var prepared = [];
        data.data.children.forEach(function (c) {
            prepared.push({
                value: c.data.score,
                date: new Date(0).setSeconds(c.data.created)
            });
        });
        chart.update(prepared);
    });
}