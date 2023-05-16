from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
import lib_remla19

app = Flask(__name__)
CORS(app)
MODEL_URL =  os.environ.get("MODEL_URL", default="http://localhost:8080/sentiment")
MODEL_VERSION = os.environ.get("VERSION", default="latest")

pageVisits = 0

@app.route("/")
def homepage():
    global pageVisits
    pageVisits += 1
    return render_template("index.html")

@app.route("/model_url", methods=["GET"])
def get_model_url():
    return jsonify({"model_url": MODEL_URL})

@app.route("/model_version", methods=["GET"])
def get_model_version():
    return jsonify({"model_version": MODEL_VERSION})

@app.route("/metrics", methods=["GET"])
def metrics():
    global pageVisits
    m = "# HELP pageVisits This shows the number of times this page was visited.\n"
    m+= "# TYPE pageVisits counter\n"
    m+= "num_requests{{page=\"\"}} {}\n".format(pageVisits)
    return Response(m, mimetype="text/plain")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9999, debug=True)
