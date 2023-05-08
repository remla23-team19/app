from flask import Flask, render_template, request, jsonify
import os
import requests
import lib_remla19

app = Flask(__name__)
MODEL_URL =  os.environ.get("MODEL_URL", default="http://localhost:8080/sentiment/")

@app.route("/")
def homepage():
    return render_template("index.html")


@app.route("/model_url", methods=["GET"])
def get_model_url():
    return jsonify({"model_url": MODEL_URL})

@app.route("/predict", methods=["POST"])
def predict():
    input = request.form.get("predict")
    if not input:
        return jsonify({"error": "No input was provided"}), 400
    try:
        response = requests.post(f"{MODEL_URL}", json={"text": input}, headers={"accept": "application/json"})
        response.raise_for_status()
        sentiment = response.json()["sentiment"]
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"sentiment": sentiment})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9999, debug=True)