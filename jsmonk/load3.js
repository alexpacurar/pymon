var fs = require('fs');

function LoadStats() {
	var names = ['avg1', 'avg5', 'avg15', 'procs_running_per_procs_possible', 'last_pid'];
	var dict = {};
	var data = fs.readFileSync('/proc/loadavg').toString('utf8').trim().split(" ");
	for (var i = 0; i < data.length; i++) {
		dict[names[i]] = data[i];
	}
	return JSON.stringify(dict);
}

function DiskStats(pattern) {
	var names = ['major_number', 'minor_number', 'device', 'reads_completed', 'reads_merged', 'sectors_read', 'read_time', 'writes_completed', 'writes_merged', 'sectors_written', 'write_time', 'io_no', 'io_time', 'wighted_io_time'];
	var dict = {};
	var data = fs.readFileSync('/proc/diskstats').toString('utf8').trim().split("\n");
	for (var i = 0; i < data.length; i++) {
		var j = data[i].trim().split(/\s+/);
		if (j[2].match(pattern)) {
			tmp = {};
			for (var k = 0; k < j.length; k++) {
		                tmp[names[k]] = j[k];
		        }
			dict[j[2]] = tmp; 
		}
	}
	return JSON.stringify(dict);
}

function MemStats() {
	dict = {};
	var data = fs.readFileSync('/proc/meminfo').toString('utf8').trim().split("\n");
	for (var i = 0; i < data.length; i++) {
		var j = data[i].trim().split(/\s+/).slice(0,2);
		dict[j[0]] = j[1];
	}
	return JSON.stringify(dict);	
}

function NetStats(pattern) {
	var names = ['ifname', 'rx_bytes', 'rx_packets', 'rx_errs', 'rx_drop', 'rx_fifo', 'rx_frame', 'rx_compressed', 'rx_multicast', 'tx_bytes', 'tx_packets', 'tx_errs', 'tx_drop', 'tx_fifo', 'tx_colls', 'tx_carrier', 'tx_compressed'];
	dict = {};
	var data = fs.readFileSync('/proc/net/dev').toString('utf8').trim().split("\n");
	for (var i = 0; i < data.length; i++) {
		var j = data[i].trim().split(/\s+/)
		if (j[0].match(pattern)) {
			tmp = {};
			for (var k = 0; k < j.length; k++ ) {
				tmp[names[k]] = j[k];
			}
			dict[j[0]] = tmp;
		}
	}
	return JSON.stringify(dict);	
}

console.log(DiskStats(/sda/))
console.log(LoadStats())
console.log(MemStats())
console.log(NetStats(/em1/))
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
