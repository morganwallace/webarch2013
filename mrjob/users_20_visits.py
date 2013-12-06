"""
Now that we have the new data file
Find users with > 20 visits
Must create this program from scratch

"""


import csv
import fileinput
from sys import stdout
csv_writer = csv.writer(stdout)

list_of_20_plus=[]

def csv_readline(line):
    """Given a string CSV line, return a list of strings."""
    for row in csv.reader([line]):
        return row

current_user=None
count=0
for line in fileinput.input():
	cell = csv_readline(line)
	
	if cell[0] == 'V':
		# print  cell
		if current_user==cell[3]:
			count+=1
		else:
			current_user = cell[3]
			count=0
		if count==21:
			list_of_20_plus.append(current_user)

print list_of_20_plus[:-10]

csv_writer.writerow(list_of_20_plus)