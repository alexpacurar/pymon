#!/usr/bin/env python
import re

def DiskStats(pattern):
	names = ['major_number', 'minor_number', 'device', 'reads_completed', 'reads_merged', 'sectors_read', 'read_time', 'writes_completed', 'writes_merged', 'sectors_written', 'write_time', 'io_no', 'io_time', 'wighted_io_time']
	stats = {}
	with open('/proc/diskstats', 'r') as f:
		for line in f:
			line = line.split()
			if re.match(pattern, line[2]):
				stats[line[2]] = {key : value for (key, value) in zip(names, line)}
	return stats

def LoadStats():
	names = ['avg1', 'avg5', 'avg15', 'procs_running_per_procs_possible', 'last_pid']
	stats = {}
	with open('/proc/loadavg', 'r') as f:
		for line in f:
			line = line.split()
			stats = {key : value for (key, value) in zip(names, line)}
	return stats

def MemStats():
	stats = {}
	with open('/proc/meminfo', 'r') as f:
		for line in f:
			line = line.split()[:2]
			stats[line[0].rstrip(':')] = line[1]
	return stats

def NetStats(pattern):
	names = ['ifname', 'rx_bytes', 'rx_packets', 'rx_errs', 'rx_drop', 'rx_fifo', 'rx_frame', 'rx_compressed', 'rx_multicast', 'tx_bytes', 'tx_packets', 'tx_errs', 'tx_drop', 'tx_fifo', 'tx_colls', 'tx_carrier', 'tx_compressed']
	stats = {}
	with open('/proc/net/dev', 'r') as f:
		net_stats = f.read().split('\n')[2:-1]
		for line in net_stats:
                	line = line.split()
                	if re.match(pattern, line[0]):
				stats[line[0].rstrip(':')] = {key : value for (key, value) in zip(names, line)}
	return stats

if __name__ == '__main__':
	disk_pattern = 'sd[a-z]+$'
        DiskStats(disk_pattern)
        LoadStats()
        MemStats()
	net_patterns = '(wlp3s0|em1)'
	NetStats(net_patterns)
