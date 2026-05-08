const BASE_URL = "https://pipeapi-backend.onrender.com";

export async function fetchSummary(temperature, pressure) {
  const res = await fetch(`${BASE_URL}/api/summary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      temperature: Number(temperature),
      pressure: Number(pressure),
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Erro ao buscar summary");
  }

  return data;
}

export async function fetchChart(temperature, pressure) {
  const res = await fetch(
    `${BASE_URL}/api/chart?temperature=${temperature}&pressure=${pressure}`,
    {
      method: "POST",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Erro ao buscar gráfico");
  }

  return data.data;
}