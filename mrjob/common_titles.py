"""
Vroots (pages) have titles
What are the 10 most common title words?
Must create this program from scratch

"""

from mrjob.job import MRJob
import csv
import fileinput
from sys import stdout
csv_writer = csv.writer(stdout)


def csv_readline(line):
    """Given a string CSV line, return a list of strings."""
    for row in csv.reader([line]):
        return row


class Topwords(MRJob):

    def mapper(self, line_no, line):
        """Extracts the Vroot that was visited"""
        cell = csv_readline(line)
        if cell[0] == 'A':
            words = cell[3].split(" ") ### FILL IN
            for word in words:
	            yield word,1
                  # What  Key, Value  do we want to output?

    def reducer(self, word, word_count):
        """Sumarizes the visit counts by adding them together.  If total visits
        is more than 10, yield the results"""
        total = sum(word_count)### FILL IN
                # How do we calculate the total visits from the visit_counts?
        if total > 10:
            yield word,total### FILL IN
                  # What  Key, Value  do we want to output?
        

# # for line in fileinput.input():
# for line in open('anonymous-msweb.data'):
# 	cell = csv_readline(line)
	
# 	if cell[0] == 'A':
# 		cellwords=cell[3].split(" ")
# 		for w in cellwords:
# 			if words.get(w)==None:
# 				words[w]=1
# 			else:
# 				words[w]=words[w]+1

def main():
	Topwords.run()
	# print list_of_20_plus
	# csv_writer.writerow(list_of_20_plus)

if __name__ == '__main__':
	main()