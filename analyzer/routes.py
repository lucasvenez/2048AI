from flask import request, jsonify

from analyzer import analyzer_blueprint


@analyzer_blueprint.route("/persist", methods=["POST"])
def persist_execution_data():
    input_payload = request.json
    with open("./data/log.txt", "w+") as file:
        file.write(str(input_payload))
    response = jsonify(msg="Data received: " + str(input_payload))
    return response


@analyzer_blueprint.route("/heart-beat", methods=["GET"])
def heart_beat():
    response = jsonify(msg="I'm Alive!")
    return response
