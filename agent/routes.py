import random

from agent import agent_blueprint
from flask import request, jsonify


@agent_blueprint.route("/next-move", methods=["POST"])
def next_move():
    current_state = request.json
    print(current_state)
    return jsonify(calculate_next_move(current_state))


def calculate_next_move(current_state):
    return random.choice([1, 2, 3, 4])
