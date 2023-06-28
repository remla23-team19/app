"""
Webservice for the frontend.
"""

import os

import lib_remla19
from flask import Flask, Response, jsonify, render_template, request

app = Flask(__name__)
MODEL_URL = os.environ.get("MODEL_URL", default="http://localhost:8080/sentiment")
MODEL_VERSION = os.environ.get("VERSION", default="latest")

PAGE_VISITS = 0
CORRECT_COUNTER = 0
INCORRECT_COUNTER = 0


@app.route("/")
def homepage():
    """
    Increments the `PAGE_VISITS` variable by 1 and returns the rendered template
    "index.html" when routing to "/".
    :return: rendered template "index.html"
    """
    global PAGE_VISITS
    PAGE_VISITS += 1
    return render_template("index.html")


@app.route("/model_url", methods=["GET"])
def get_model_url():
    """
    Returns the model URL as a JSON response for route "/model_url".
    :return: a JSON response containing the model URL.
    """
    return jsonify({"model_url": MODEL_URL})


@app.route("/correctness", methods=["POST"])
def set_correctness():
    """
    Updates global counters based on the correctness value received in
    the request, and returns a JSON response. Available at route "/correctness".
    :return: a JSON response with the key "response" and the value "thanks".
    """
    global CORRECT_COUNTER
    global INCORRECT_COUNTER

    content = request.json
    if content["correctness"] == "correct":
        CORRECT_COUNTER += 1
    else:
        INCORRECT_COUNTER += 1
    return jsonify({"response": "thanks"})


@app.route("/model_version", methods=["GET"])
def get_model_version():
    """
    Returns the model version as a JSON response for route "/model_version".
    :return: a JSON response containing the model version.
    """
    return jsonify({"model_version": MODEL_VERSION})


@app.route("/metrics", methods=["GET"])
def metrics():
    """
    Summary of metrics related to the number of page visits and the
    balance of correct and incorrect predictions based on user feedback.
    Available at route "/metrics".
    :return: a response containing metrics information in plain text format. The metrics include the
    number of times the page was visited (`num_requests`) and the balance of correct and incorrect
    predictions based on user feedback (`correctness`).
    """
    m = " >>> METRICS OVERVIEW <<<\n\n"
    m += "# HELP num_requests This shows the number of times this page was visited.\n"
    m += "# TYPE num_requests counter\n"
    m += f'num_requests{{page="frontend"}}: {PAGE_VISITS}\n\n'

    m += "# HELP correctness This shows the balance of correct and incorrect predictions \
          based on user feedback.\n"
    m += "# TYPE correctness gauge\n"
    m += "correctness: " + str(CORRECT_COUNTER - INCORRECT_COUNTER) + "\n\n"
    return Response(m, mimetype="text/plain")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9999, debug=True)
