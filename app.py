from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import joblib

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# Load first model (e.g., basic model)
model1 = joblib.load("chilll.pkl")

# Load second model + scaler (e.g., from heartchill.pkl)
with open("heartchill.pkl", "rb") as f:
    model2, scaler2 = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict_model1():
    try:
        data = request.json
        features = np.array(data["features"]).reshape(1, -1)

        prediction = model1.predict(features)[0]
        probability = model1.predict_proba(features)[0].tolist()

        return jsonify({
            "prediction": int(prediction),
            "probability": probability
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/predictt", methods=["POST"])
def predict_model2():
    try:
        data = request.json
        features = np.array(data["features"]).reshape(1, -1)

        # Apply scaler before predicting
        features_scaled = scaler2.transform(features)

        prediction = model2.predict(features_scaled)[0]
        probability = model2.predict_proba(features_scaled)[0].tolist()

        return jsonify({
            "prediction": int(prediction),
            "probability": probability
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=8000, debug=True)
