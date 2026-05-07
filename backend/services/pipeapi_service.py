import os
import requests
from dotenv import load_dotenv

load_dotenv()


class PipeAPIService:
    def __init__(self):
        self.base_url = os.getenv("PIPEAPI_BASE_URL", "").rstrip("/")

    def get_thermo_buckling_summary(self, params):
        url = f"{self.base_url}/app/pipeapi/api/thermo-buckling"

        response = requests.get(
            url,
            params=params,
            timeout=30
        )

        response.raise_for_status()

        return response.json()

    def post_thermo_buckling_table(self, payload):
        url = f"{self.base_url}/app/pipeapi/api/thermo-buckling/table"

        response = requests.post(
            url,
            json=payload,
            timeout=30
        )

        response.raise_for_status()

        # evita erro caso a API não retorne JSON
        try:
            return response.json()
        except:
            return []