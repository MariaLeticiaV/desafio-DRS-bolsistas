import os
import requests
from dotenv import load_dotenv

load_dotenv()


class PipeAPIService:
    def __init__(self):
        self.base_url = os.getenv("PIPEAPI_BASE_URL", "").rstrip("/")

    def is_configured(self):
        return bool(self.base_url)

    def get_thermo_buckling_summary(self, params):
        if not self.base_url:
            raise ValueError("PIPEAPI_BASE_URL não configurada no arquivo .env")

        url = f"{self.base_url}/app/pipeapi/api/thermo-buckling"
        response = requests.get(url, params=params, timeout=30)
        response.raise_for_status()
        return response.json()

    def post_thermo_buckling_table(self, payload):
        if not self.base_url:
            raise ValueError("PIPEAPI_BASE_URL não configurada no arquivo .env")

        url = f"{self.base_url}/app/pipeapi/api/thermo-buckling/table"
        response = requests.post(url, json=payload, timeout=30)
        response.raise_for_status()
        return response.json()
    
    def post_thermo_buckling_plot_data(self, payload):
        if not self.base_url:
            raise ValueError("PIPEAPI_BASE_URL não configurada")

        url = f"{self.base_url}/app/pipeapi/api/thermo-buckling/plot_data"
        response = requests.post(url, json=payload, timeout=30)
        response.raise_for_status()
        return response.json()