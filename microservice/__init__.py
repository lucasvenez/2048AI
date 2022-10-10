from flask import Blueprint, request, jsonify, Response

analyzer = Blueprint("analyzer", __name__)


@analyzer.route("/persist", methods=["POST"])
def persist_execution_data():
    input_payload = request.json
    with open("./data/log.txt", "w+") as file:
        file.write(str(input_payload))
    response = jsonify(msg="Data received: " + str(input_payload))
    return response


@analyzer.route("/heart-beat", methods=["GET"])
def heart_beat():
    response = jsonify(msg="I'm Alive!")
    return response


@analyzer.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    return response
