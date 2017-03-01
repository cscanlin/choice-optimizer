import os
import sys
import json
import ctypes
import traceback

for d, _, files in os.walk('lib'):
    for f in files:
        if f.endswith('.a'):
            continue
        ctypes.cdll.LoadLibrary(os.path.join(d, f))

from choice_optimizer import optimize_choice_data

def handler(lambda_func):
    def handle(event, context=None):
        data = json.loads(event['body']) if 'body' in event.keys() else event
        try:
            output = lambda_func(data)
            if output['success']:
                status = 200
            else:
                status = 400
        except Exception:
            output = {
                'success': False,
                'message': ''.join(traceback.format_exception(*sys.exc_info()))
            }
            status = 500
        finally:
            return {
                'statusCode': status,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(output),
            }
    return handle

choice_optimizer_handler = handler(optimize_choice_data)

if __name__ == '__main__':
    with open('test_data/test_data.json') as f:
        data = json.loads(f.read())
        print(choice_optimizer_handler(data))
