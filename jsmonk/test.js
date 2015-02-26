var fs = require('fs');
var stats = require('./jsmonk');

var data = JSON.parse(fs.readFileSync('./test.json'));
var diskPattern = /sda$/;
var netPattern = /em1/;
//var diskStats = JSON.parse(stats.DiskStats(/sda/));
//var loadStats = JSON.parse(stats.LoadStats());
//var memStats = JSON.parse(stats.MemStats());
//var netStats = JSON.parse(stats.NetStats(/em1/));


console.log(stats.TransformComplex(JSON.parse(stats.DiskStats(diskPattern)), 'disk_stats', data));
console.log(stats.TransformComplex(JSON.parse(stats.NetStats(netPattern)), 'net_stats', data));
console.log(stats.TransformSimple(JSON.parse(stats.LoadStats()), 'load_stats', data));
console.log(stats.TransformSimple(JSON.parse(stats.MemStats()), 'mem_stats', data));
