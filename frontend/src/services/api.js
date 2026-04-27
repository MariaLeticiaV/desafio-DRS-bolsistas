const BASE_URL = "http://127.0.0.1:5000";

export async function fetchSummary(temperature, pressure) {
  const response = await fetch(`${BASE_URL}/api/summary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ temperature, pressure }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Erro ao buscar summary");
  }

  return response.json();
}

export async function fetchHistory() {
  const response = await fetch(`${BASE_URL}/api/history`);

  if (!response.ok) {
    throw new Error("Erro ao buscar histórico");
  }

  return response.json();
}

export async function fetchChart() {
  const response = await fetch(`${BASE_URL}/api/chart`);

  if (!response.ok) {
    throw new Error("Erro ao buscar gráfico");
  }

  return response.json();
}