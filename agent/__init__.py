from flask import Blueprint

agent_blueprint = Blueprint("agent_blueprint", __name__)

from .routes import *
