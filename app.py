from flask import Flask, Response, render_template, request, jsonify
import os
import lib_remla19

app = Flask(__name__)
MODEL_URL = os.environ.get(
    "MODEL_URL", default="http://localhost:8080/sentiment")
MODEL_VERSION = os.environ.get("VERSION", default="latest")

pageVisits = 0
correct = 0
incorrect = 0

@app.route("/")
def homepage():
    global pageVisits
    pageVisits += 1
    return render_template("index.html")


@app.route("/model_url", methods=["GET"])
def get_model_url():
    return jsonify({"model_url": MODEL_URL})

@app.route("/correctness", methods["POST"])
def set_correctness():
    global correct
    global incorrect
    content = request.json
    if content["correctness"] == "correct":
      correct += 1
    else:
      incorrect += 1


@app.route("/model_version", methods=["GET"])
def get_model_version():
    return jsonify({"model_version": MODEL_VERSION})


@app.route("/metrics", methods=["GET"])
def metrics():
    global pageVisits
    global correct
    global incorrect

    m = "# HELP num_requests This shows the number of times this page was visited.\n"
    m += "# TYPE num_requests counter\n"
    m += "num_requests{{page=\"frontend\"}} {}\n".format(pageVisits)

    m+= "# HELP correctness shows the balance of correct and incorrect predictions.\n"
    m+= "# TYPE correctness gauge\n"
    m+= "correctness" + str(correct - incorrect) + "\n\n"
    return Response(m, mimetype="text/plain")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9999, debug=True)
