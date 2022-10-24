from flask import Flask


def main():
    application = Flask(__name__)

    from analyzer import analyzer_blueprint
    application.register_blueprint(analyzer_blueprint, url_prefix="/analyzer")

    from agent import agent_blueprint
    application.register_blueprint(agent_blueprint, url_prefix="/agent")

    @application.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', '*')
        response.headers.add('Access-Control-Allow-Methods', '*')
        return response

    application.run(host="0.0.0.0", port=9092)


if __name__ == "__main__":
    main()
