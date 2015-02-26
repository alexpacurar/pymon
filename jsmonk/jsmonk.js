//jsmonk.js

var fs = require('fs');

module.exports = {

LoadStats: function () {
		var names = ['avg1', 'avg5', 'avg15', 'procs_running_per_procs_possible', 'last_pid'];
		var dict = {};
		var data = fs.readFileSync('/proc/loadavg').toString('utf8').trim().split(" ");
		for (var i = 0; i < data.length; i++) {
			dict[names[i]] = data[i];
		}
		return JSON.stringify(dict);
	},

DiskStats: function (pattern) {
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
	},

MemStats: function () {
		dict = {};
		var data = fs.readFileSync('/proc/meminfo').toString('utf8').trim().split("\n");
		for (var i = 0; i < data.length; i++) {
			var j = data[i].trim().split(/\s+/).slice(0,2);
			dict[j[0].replace(/:$/,'')] = j[1];
		}
		return JSON.stringify(dict);	
	},

NetStats: function (pattern) {
		var names = ['ifname', 'rx_bytes', 'rx_packets', 'rx_errs', 'rx_drop', 'rx_fifo', 'rx_frame', 'rx_compressed', 'rx_multicast', 'tx_bytes', 'tx_packets', 'tx_errs', 'tx_drop', 'tx_fifo', 'tx_colls', 'tx_carrier', 'tx_compressed'];
		dict = {};
		var data = fs.readFileSync('/proc/net/dev').toString('utf8').trim().split("\n");
		for (var i = 0; i < data.length; i++) {
			var j = data[i].trim().split(/\s+/)
			if (j[0].match(pattern)) {
				j[0] = j[0].replace(/:$/,'')
				tmp = {};
				for (var k = 0; k < j.length; k++ ) {
					tmp[names[k]] = j[k];
				}
				dict[j[0]] = tmp;
			}
		}
		return JSON.stringify(dict);	
	},

TransformComplex: function (stats, key, data) {
		rdata = {}
        	for (var name in stats) {
                	for (var stat in stats[name]) {
                        	for (var i in data[key]) {
                                	if (stat == data[key][i]) {
                                        	rdata[name + "." + stat]  = stats[name][stat]
	                                }
        	                }
                	}
	        }
        	return JSON.stringify(rdata)
	},

TransformSimple: function (stats, key, data) {
	        rdata = {}
        	for (var stat in stats) {
                	for (var i in data[key]) {
                        	if (stat == data[key][i]) {
                                	rdata[stat] = stats[stat]
	                        }
        	        }
        	}
	        return JSON.stringify(rdata)
	}
};
