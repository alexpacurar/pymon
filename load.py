#!/usr/bin/env python
def getLoadStats():
	names = ['avg1', 'avg5', 'avg15', 'procs_running_per_procs_possible', 'last_pid']
	from re import match
	stats = {}
	with open('/proc/loadavg', 'r') as f:
		for line in f:
			line = line.split()
			stats = {key : value for (key, value) in zip(names, line)}
	return stats

if __name__ == '__main__':
	print getLoadStats()
