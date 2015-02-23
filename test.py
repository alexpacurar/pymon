import pymonk
import json
import bernhard
import time



disk_pattern = 'sd[a-z]+$'
net_pattern = '(wlp3s0|em1)'

f = open("test.json","r")
config = f.read()
f.close()

config = json.loads(config)


c = bernhard.Client(host='kumo-ops-riemann01', port=5555)

while True:
	for disk, stats in pymonk.DiskStats(disk_pattern).items():
		for stat_name, stat_val in stats.items():
			if stat_name in config['disk_stats']: 
				print(stat_name, stat_val)
				c.send({'host': 'ws452', 'service': 'disk.{0}.{1}'.format(disk, stat_name), 'metric': float(stat_val)})
 
	
	for stat_name, stat_val in pymonk.LoadStats().items():
		if stat_name in config['load_stats']: 
			print(stat_name, stat_val)
			c.send({'host': 'ws452', 'service': 'load.{0}'.format(stat_name), 'metric': float(stat_val)})
	
	for stat_name, stat_val in pymonk.MemStats().items():
		if stat_name in config['mem_stats']: 
			print(stat_name, stat_val)
			c.send({'host': 'ws452', 'service': 'mem.{0}'.format(stat_name), 'metric': float(stat_val)})
	
	for ifname, stats in pymonk.NetStats(net_pattern).items():
		for stat_name, stat_val in stats.items():
			if stat_name in config['net_stats']: 
				print(stat_name, stat_val)
				c.send({'host': 'ws452', 'service': 'net.{0}.{1}'.format(ifname, stat_name), 'metric': float(stat_val)})
	
	time.sleep(10)
