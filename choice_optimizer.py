from collections import defaultdict, OrderedDict
import csv
from scipy.optimize import linprog

def data_from_csv(file_name):
    with open(file_name) as csvfile:
        reader = list(csv.DictReader(csvfile))
    return {
        'choiceRanks': {row['user']: {k: v for k, v in row.items() if k != 'user'} for row in reader}
    }

def format_data(data):
    objective = OrderedDict()
    variables = set(data['choiceRanks'].keys()) | set(next(iter(data['choiceRanks'].values())).keys())
    constraints = defaultdict(list)
    for name, choices in data['choiceRanks'].items():
        for choice, rank in choices.items():
            objective[(name, choice)] = -int(rank)
            for variable in variables:
                constraints[variable] += [1 if variable in [name, choice] else 0]
    return objective, constraints

def optimize_choice_data(data):
    objective, constraints = format_data(data)
    ordered_variables, equations = zip(*constraints.items())
    constraint_bounds = data.get('constraint_bounds', {})
    results = linprog(
        c=list(objective.values()),
        A_ub=equations,
        b_ub=[constraint_bounds.get(variable, 1) for variable in ordered_variables],
        options={"disp": True}
    )
    formatted_result = defaultdict(dict)
    for (name, choice), score in zip(objective.keys(), results.x):
        formatted_result[name][choice] = score
    return formatted_result

if __name__ == '__main__':
    print("""
     user, a, b, c
        w, 3, 6, 9
        x, 5, 4, 1
        y, 5, 1, 4
        z, 4, 5, 3
    """)
    data = data_from_csv('test_data/test_data.csv')
    print(optimize_choice_data(data))
