from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
import lib_remla19

app = Flask(__name__)
CORS(app)
MODEL_URL =  os.environ.get("MODEL_URL", default="http://localhost:8080/sentiment")
MODEL_VERSION = os.environ.get("VERSION", default="latest")

@app.route("/")
def homepage():
    return render_template("index.html")

@app.route("/model_url", methods=["GET"])
def get_model_url():
    return jsonify({"model_url": MODEL_URL})

@app.route("/model_version", methods=["GET"])
def get_model_version():
    return jsonify({"model_version": MODEL_VERSION})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9999, debug=True)
