from flask import Flask

from microservice import analyzer


def main():
    application = Flask(__name__)
    application.register_blueprint(analyzer)
    application.run(host="0.0.0.0", port=9092)


if __name__ == "__main__":
    main()
