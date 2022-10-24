from flask import Blueprint, request, jsonify, Response

analyzer_blueprint = Blueprint("analyzer", __name__)

@analyzer_blueprint.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Allow-Methods', '*')
    return response

from .routes import *
