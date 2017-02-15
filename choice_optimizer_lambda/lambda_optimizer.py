from flask import Flask, jsonify
from choice_optimizer import optimize_choice_data

app = Flask(__name__)

@app.route("/optimize_choices", methods=['POST'])
def optimize_choices(request):
    output = optimize_choice_data(request.json)
    return jsonify(output)

if __name__ == "__main__":
    app.run()
