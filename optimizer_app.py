from sanic import Sanic
from sanic.response import json, html
from choice_optimizer import optimize_choice_data

app = Sanic()

app.static('/static', './build/static')

@app.route("/")
async def test(request):
    with open('./build/index.html') as f:
        return html(f.read())

@app.route("/optimize_choices", methods=['POST'])
async def optimize_choices(request):
    output = optimize_choice_data(request.json)
    return json(output)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000)
