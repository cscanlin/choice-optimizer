from datetime import datetime
import json
import random
import os
from string import ascii_lowercase

from choice_optimizer import optimize_choice_data

THIS_DIR = os.path.dirname(os.path.realpath(__file__))

def generate_test_data(num_names, num_choices):
    data = {
        'orderedNames': [],
        'orderedChoices': [],
        'choiceRanks': {},
        'choicesPerName': {},
        'maxPerChoice': {},
        'noRepeatChoices': True,
    }
    for n in range(num_names):
        name = 'name_{}'.format(n)
        data['orderedNames'].append(name)
        data['choiceRanks'][name] = {}
        data['choicesPerName'][name] = 1
        for letter in ascii_lowercase[:num_choices]:
            choice = 'choice_{}'.format(letter)
            if choice not in data['orderedChoices']:
                data['orderedChoices'].append(choice)
            data['choiceRanks'][name][choice] = random.randint(0, 9)
            data['maxPerChoice'][choice] = (num_names // num_choices) + 1
    return data

def timing_test(data):
    start = datetime.now()
    print(start, '{0} names - {1} choices'.format(len(data['choicesPerName']), len(data['maxPerChoice'])))
    data = optimize_choice_data(data)
    print('time elapsed:', datetime.now() - start, '\n')
    return data

def export_test_data(data, file_name='test_data_large'):
    with open(os.path.join(THIS_DIR, 'test_data', '{}.json'.format(file_name)), 'w') as f:
        f.write(json.dumps(data, indent=2))

if __name__ == '__main__':
    # export_test_data(generate_test_data(num_names=400, num_choices=3))

    timing_test(generate_test_data(num_names=10, num_choices=5))  # 2 milliseconds
    timing_test(generate_test_data(num_names=100, num_choices=5))  # 1.5 seconds
    timing_test(generate_test_data(num_names=100, num_choices=10))  # 6.5 seconds
    timing_test(generate_test_data(num_names=200, num_choices=5))  # 7.5 seconds

    timing_test(generate_test_data(num_names=200, num_choices=6))  # 15 seconds (lambda)
    timing_test(generate_test_data(num_names=400, num_choices=3))  # 19 seconds (lambda)
    timing_test(generate_test_data(num_names=600, num_choices=2))  # 23 seconds (lambda)
    timing_test(generate_test_data(num_names=600, num_choices=2))  # 18 seconds

    timing_test(generate_test_data(num_names=80, num_choices=20))  # 21 seconds
    timing_test(generate_test_data(num_names=100, num_choices=15))  # 20 seconds
    timing_test(generate_test_data(num_names=150, num_choices=10))  # 20 seconds
    timing_test(generate_test_data(num_names=250, num_choices=6))  # 21 seconds
    timing_test(generate_test_data(num_names=180, num_choices=8))  # 18 seconds
    timing_test(generate_test_data(num_names=300, num_choices=5))  # 22 seconds
    timing_test(generate_test_data(num_names=500, num_choices=3))  # 26 seconds
    timing_test(generate_test_data(num_names=700, num_choices=2))  # 27 seconds

    timing_test(generate_test_data(num_names=350, num_choices=5))  # 36 seconds
    timing_test(generate_test_data(num_names=200, num_choices=10))  # 45 seconds
    timing_test(generate_test_data(num_names=500, num_choices=5))  # 1:45 minutes

    timing_test(generate_test_data(num_names=500, num_choices=10))  # 13 minutes
    timing_test(generate_test_data(num_names=1000, num_choices=5))  # 15 minutes

    # timing_test(generate_test_data(num_names=1000, num_choices=10))  # 2 hours?
