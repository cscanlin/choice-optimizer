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

def handler(f):
    def handle(event, context=None):
        data = json.loads(event['body']) if 'body' in event.keys() else event
        try:
            output = f(data)
            status = 200
        except Exception:
            output = {'message': traceback.format_exception(*sys.exc_info())}
            status = 400
        finally:
            return {
                'statusCode': status,
                'headers': {},
                'body': json.dumps(output),
            }
    return handle

choice_optimizer_handler = handler(optimize_choice_data)
