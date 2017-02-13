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
    name_variables = data['choiceRanks'].keys()
    choice_variables = next(iter(data['choiceRanks'].values())).keys()
    ub_constraints, eq_constraints = defaultdict(list), defaultdict(list)
    for name, choices in data['choiceRanks'].items():
        for choice, rank in choices.items():
            objective[(name, choice)] = -int(rank)
            for cv in choice_variables:
                ub_constraints[cv].append(int(cv == choice))
            for nv in name_variables:
                eq_constraints[nv].append(int(nv == name))
    return objective, ub_constraints, eq_constraints

def optimize_choice_data(data):
    objective, ub_constraints, eq_constraints = format_data(data)
    ordered_ub_variables, ub_equations = zip(*ub_constraints.items())
    ordered_eq_variables, eq_equations = zip(*eq_constraints.items())
    constraint_bounds = data.get('constraintBounds', {})
    variable_bounds = [(0, 1) for _ in objective] if data.get('noRepeatChoices', None) else None
    results = linprog(
        c=list(objective.values()),
        A_ub=ub_equations,
        b_ub=[constraint_bounds.get(variable, 1) for variable in ordered_ub_variables],
        A_eq=eq_equations,
        b_eq=[constraint_bounds.get(variable, 1) for variable in ordered_eq_variables],
        bounds=variable_bounds,
        options={"disp": True},
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
