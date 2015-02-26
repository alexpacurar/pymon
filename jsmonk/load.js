var fs = require('fs');

function LoadStats() {
	var names = ['avg1', 'avg5', 'avg15', 'procs_running_per_procs_possible', 'last_pid'];
	var dict = {}
	var stream = fs.createReadStream('/proc/loadavg') 
	stream.on('data', function(data) {
		var data = data.toString('utf8').trim().split(" ");
		for (var i = 0; i < data.length; i++) {
			dict[names[i]] = data[i] 
		}
	});
//	stream.on('end', function () {
//		return dict;
//	});
//	return dict;
	return stream;
}

var s2 = LoadStats();
s2.on('end', function () {
	console.log(dict);
});
