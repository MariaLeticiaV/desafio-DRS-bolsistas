from flask import Flask, request, jsonify
from utils.validators import validate_temperature, validate_pressure
from services.pipeapi_service import PipeAPIService
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
pipeapi_service = PipeAPIService()

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

    if not isinstance(item, dict):
        return {}

    return item


@app.route("/")
def home():
    return "Backend rodando!"


@app.route("/health")
def health():
    return {"status": "ok"}


@app.route("/api/summary", methods=["POST"])
def summary():
    body = request.get_json()

    if not body:
        return jsonify({"error": "Body da requisição não enviado"}), 400

    temperature = body.get("temperature")
    pressure = body.get("pressure")

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

    if not pipeapi_service.is_configured():
        result = {
            "input": {
                "temperature": temperature,
                "pressure": pressure
            },
            "result": {
                "bending_moment__kNm": 290,
                "compressive_stress__MPa": 315,
                "lateral_displacement__m": 0.82,
                "status": "Estável",
                "source": "mock"
            }
        }
        return jsonify(result), 200

    try:
        api_response = pipeapi_service.get_thermo_buckling_summary(params)

        data = api_response[0] if isinstance(api_response, list) and len(api_response) > 0 else api_response

        if not isinstance(data, dict):
            return jsonify({
                "error": "Formato inesperado da PipeAPI",
                "raw_result": api_response
        }), 500

        normalized_result = {
            "bending_moment__kNm": data.get("bending_moment__kNm"),
            "compressive_stress__MPa": data.get("compressive_stress__MPa"),
            "lateral_displacement__m": data.get("lateral_displacement__m"),
            "status": "Estável" if not data.get("warnings") else "Com alertas",
            "warnings": data.get("warnings", [])
        }

        return jsonify({
            "input": {
            "temperature": temperature,
            "pressure": pressure
        },
        "result": normalized_result,
        "source": "pipeapi",
        "raw_result": api_response
    }), 200

    except Exception as error:
        return jsonify({
            "error": "Erro ao consultar a PipeAPI",
            "details": str(error)
        }), 500

@app.route("/api/history", methods=["GET"])
def history():
    xy_pairs = [
        {"temperature": 20, "pressure": 30},
        {"temperature": 25, "pressure": 30},
        {"temperature": 30, "pressure": 35},
        {"temperature": 35, "pressure": 35},
        {"temperature": 40, "pressure": 40},
        {"temperature": 45, "pressure": 40},
        {"temperature": 50, "pressure": 45},
        {"temperature": 55, "pressure": 45},
        {"temperature": 60, "pressure": 50},
        {"temperature": 65, "pressure": 50}
    ]

    payload = {
        "entity": DEFAULT_ENTITY,
        "xy_pairs": xy_pairs
    }

    try:
        api_response = pipeapi_service.post_thermo_buckling_table(payload)

        normalized_data = []

        for index, item in enumerate(api_response):
            data = normalize_pipeapi_item(item)
            pair = xy_pairs[index]

            normalized_data.append({
                "temp": pair["temperature"],
                "pressure": pair["pressure"],
                "moment": data.get("bending_moment__kNm"),
                "stress": data.get("compressive_stress__MPa"),
                "displacement": data.get("lateral_displacement__m")
            })

        return jsonify({
            "count": len(normalized_data),
            "source": "pipeapi",
            "data": normalized_data,
            "raw_result": api_response
        }), 200

    except Exception as error:
        return jsonify({
            "error": "Erro ao consultar histórico na PipeAPI",
            "details": str(error)
        }), 500

@app.route("/api/chart", methods=["GET"])
def chart():
    xy_pairs = [
        {"temperature": 20, "pressure": 30},
        {"temperature": 25, "pressure": 30},
        {"temperature": 30, "pressure": 35},
        {"temperature": 35, "pressure": 35},
        {"temperature": 40, "pressure": 40},
        {"temperature": 45, "pressure": 40},
        {"temperature": 50, "pressure": 45},
        {"temperature": 55, "pressure": 45},
        {"temperature": 60, "pressure": 50},
        {"temperature": 65, "pressure": 50}
    ]

    payload = {
        "entity": DEFAULT_ENTITY,
        "xy_pairs": xy_pairs
    }

    try:
        api_response = pipeapi_service.post_thermo_buckling_table(payload)

        chart_data = []

        for index, item in enumerate(api_response):
            data = normalize_pipeapi_item(item)
            pair = xy_pairs[index]

            chart_data.append({
                "temperature": pair["temperature"],
                "value": data.get("bending_moment__kNm")
            })

        return jsonify({
            "source": "pipeapi",
            "data": chart_data,
            "raw_result": api_response
        }), 200

    except Exception as error:
        return jsonify({
            "error": "Erro ao consultar dados do gráfico na PipeAPI",
            "details": str(error)
        }), 500
    
if __name__ == "__main__":
    app.run(debug=True)