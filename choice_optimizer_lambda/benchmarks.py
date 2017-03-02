from datetime import datetime
import random
from string import ascii_lowercase

from choice_optimizer import optimize_choice_data

def timing_test(num_names=100, num_choices=5):
    start = datetime.now()
    print(start, '{0} names - {1} choices'.format(num_names, num_choices))
    data = {
        'choiceRanks': {},
        'choicesPerName': {},
        'maxPerChoice': {},
    }
    for n in range(num_names):
        name = 'name_{}'.format(n)
        data['choiceRanks'][name] = {}
        data['choicesPerName'][name] = 1
        for letter in ascii_lowercase[:num_choices]:
            choice = 'choice_{}'.format(letter)
            data['choiceRanks'][name][choice] = random.randint(0, 10)
            data['maxPerChoice'][choice] = (num_names // num_choices) + 1
    data = optimize_choice_data(data)
    print('time elapsed:', datetime.now() - start)
    return data

if __name__ == '__main__':
    timing_test(num_names=10, num_choices=5)  # 2 milliseconds
    timing_test(num_names=100, num_choices=5)  # 1.5 seconds
    timing_test(num_names=100, num_choices=10)  # 6.5 seconds
    timing_test(num_names=200, num_choices=5)  # 7.5 seconds
    timing_test(num_names=500, num_choices=5)  # 1:45 minutes
    timing_test(num_names=500, num_choices=10)  # 13 minutes
    timing_test(num_names=1000, num_choices=5)  # 15 minutes
    timing_test(num_names=1000, num_choices=10)  # 2 hours?
