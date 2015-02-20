#!/usr/bin/env python
def getNetStats(pattern, names):
	from re import match
	stats = []
	with open('/proc/net/dev', 'r') as f:
		net_stats = f.read().split('\n')[2:-1]
		for line in net_stats:
                        line = line.split()
#			print line
                        if match(pattern, line[0]):
	                        stats.append({key : value for (key, value) in zip(names, line)})
	return stats

if __name__ == '__main__':
	patterns = '(wlp3s0|em1)'
	names = ['ifname', 'rx_bytes', 'rx_packets', 'rx_errs', 'rx_drop', 'rx_fifo', 'rx_frame', 'rx_compressed', 'rx_multicast', 'tx_bytes', 'tx_packets', 'tx_errs', 'tx_drop', 'tx_fifo', 'tx_colls', 'tx_carrier', 'tx_compressed']
	stats =	getNetStats(patterns, names)
	for i in stats:
		 print i
#!/usr/bin/env python
#def getDiskStats(pattern, names):
#	from re import match
#	stats = []
#	with open('/proc/diskstats', 'r') as f:
#		for line in f:
#			line = line.split()
#			if match(pattern, line[2]):
#				stats.append({key : value for (key, value) in zip(names, line)})
#	return stats
#
#def load(stats_old, stats_new, time):
#	for i, j in zip(stats_old, stats_new):
#		print 'IO load for {0} is {1}%'.format(i['device'], getNiceValue(i['io_time'], j['io_time'], time))
#
#def getNiceValue(old, new, time):
#	return ((int(new) - int(old)) / (int(time) * 1000.) ) * 100
#
#if __name__ == '__main__':
#	from time import sleep
#	pattern = 'sd[a-z]+$'
#	names = ['major_number', 'minor_number', 'device', 'reads_completed', 'reads_merged', 'sectors_read', 'read_time', 'writes_completed', 'writes_merged', 'sectors_written', 'write_time', 'io_no', 'io_time', 'wighted_io_time']
#	time = 5
#	while True:
#		old_stats = getDiskStats(pattern, names)
#		sleep(time)
#		stats = getDiskStats(pattern, names)
#		load(old_stats, stats, time)
#!/usr/bin/env python