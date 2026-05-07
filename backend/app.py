from flask import Flask, request, jsonify
from utils.validators import validate_temperature, validate_pressure
from services.pipeapi_service import PipeAPIService
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

pipeapi_service = PipeAPIService()

history_store = []

DEFAULT_ENTITY = {
    "di": 139.7,
    "t": 12.7,
    "t_cra": 0,
    "w_sub_empty": 0.2,
    "rho_content": 500,
    "mu_lateral": 0.7,
    "mu_axial": 0.5,
    "vas": 1500,
    "h_sleeper": 0.8,
    "mu_sleeper": 0.2,
    "de_rating": 70
}


def normalize_pipeapi_item(item):
    if isinstance(item, list) and len(item) > 0:
        item = item[0]
    return item if isinstance(item, dict) else {}

@app.route("/")
def home():
    return "Backend rodando!"


@app.route("/health")
def health():
    return {"status": "ok"}

@app.route("/api/summary", methods=["POST"])
def summary():
    try:
        body = request.get_json()

        if not body:
            return jsonify({"error": "Body não enviado"}), 400

        temperature = float(body.get("temperature"))
        pressure = float(body.get("pressure"))

        temp_error = validate_temperature(temperature)
        if temp_error:
            return jsonify({"error": temp_error}), 400

        pressure_error = validate_pressure(pressure)
        if pressure_error:
            return jsonify({"error": pressure_error}), 400

        params = {
            **DEFAULT_ENTITY,
            "temperature": temperature,
            "pressure": pressure
        }

        api_response = pipeapi_service.get_thermo_buckling_summary(params)

        data = api_response[0] if isinstance(api_response, list) else api_response

        result = {
            "temperature": temperature,
            "pressure": pressure,
            "moment": data.get("bending_moment__kNm"),
            "stress": data.get("compressive_stress__MPa"),
            "displacement": data.get("lateral_displacement__m"),
            "status": "Estável" if not data.get("warnings") else "Alerta"
        }

        history_store.insert(0, result)

        return jsonify({
            "input": {
                "temperature": temperature,
                "pressure": pressure
            },
            "result": data
        }), 200

    except Exception as error:
        return jsonify({
            "error": "Erro na API",
            "details": str(error)
        }), 500

@app.route("/api/history", methods=["GET"])
def history():
    return jsonify({
        "data": history_store
    }), 200

@app.route("/api/chart", methods=["GET"])
def chart():
    try:
        temperature = request.args.get("temperature", type=float)
        pressure = request.args.get("pressure", type=float)

        if temperature is None or pressure is None:
            return jsonify({"error": "Parâmetros obrigatórios"}), 400

        temperatures = [
    t for t in range(
        int(temperature) - 20,
        int(temperature) + 21,
        10
    )
    if 20 <= t <= 120
]

        xy_pairs = [{"temperature": t, "pressure": pressure} for t in temperatures]

        payload = {
            "entity": DEFAULT_ENTITY,
            "xy_pairs": xy_pairs
        }

        api_response = pipeapi_service.post_thermo_buckling_table(payload)

        chart_data = []

        for i, item in enumerate(api_response):
            data = normalize_pipeapi_item(item)

            chart_data.append({
                "temperature": xy_pairs[i]["temperature"],
                "value": data.get("bending_moment__kNm")
            })

        return jsonify({"data": chart_data}), 200

    except Exception as error:
        return jsonify({
            "error": str(error)
        }), 500

import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))

    app.run(
        host="0.0.0.0",
        port=port
    )