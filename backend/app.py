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
    mock_data = [
        {"temp": 20, "pressure": 30, "moment": 150, "stress": 210, "displacement": 0.30},
        {"temp": 25, "pressure": 30, "moment": 165, "stress": 220, "displacement": 0.35},
        {"temp": 30, "pressure": 35, "moment": 180, "stress": 235, "displacement": 0.40},
        {"temp": 35, "pressure": 35, "moment": 200, "stress": 250, "displacement": 0.46},
        {"temp": 40, "pressure": 40, "moment": 220, "stress": 265, "displacement": 0.55},
        {"temp": 45, "pressure": 40, "moment": 240, "stress": 280, "displacement": 0.63},
        {"temp": 50, "pressure": 45, "moment": 260, "stress": 300, "displacement": 0.72},
        {"temp": 55, "pressure": 45, "moment": 280, "stress": 315, "displacement": 0.80},
        {"temp": 60, "pressure": 50, "moment": 300, "stress": 330, "displacement": 0.91},
        {"temp": 65, "pressure": 50, "moment": 320, "stress": 345, "displacement": 1.02}
    ]

    return jsonify({
        "count": len(mock_data),
        "source": "mock",
        "data": mock_data
    }), 200

@app.route("/api/chart", methods=["GET"])
def chart():
    mock_chart = [
        {"temperature": 30, "value": 180},
        {"temperature": 40, "value": 210},
        {"temperature": 50, "value": 250},
        {"temperature": 60, "value": 290},
        {"temperature": 70, "value": 320},
        {"temperature": 80, "value": 350},
        {"temperature": 90, "value": 380}
    ]

    return jsonify({
        "source": "mock",
        "data": mock_chart
    }), 200

if __name__ == "__main__":
    app.run(debug=True)
