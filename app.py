from flask import Flask, render_template, request, jsonify
import os
import requests

app = Flask(__name__)
MODEL_URL =  os.environ.get("MODEL_URL", "http://localhost:8080/sentiment")

@app.route("/")
def homepage():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    input = request.form.get("query")
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