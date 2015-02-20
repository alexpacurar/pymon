#!/usr/bin/env python
def getMemStats():
	stats = {}
	with open('/proc/meminfo', 'r') as f:
		for line in f:
			line = line.split()[:2]
			stats[line[0].rstrip(':')] = line[1]
	return stats

if __name__ == '__main__':
	print getMemStats()
