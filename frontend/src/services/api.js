const BASE_URL = "https://pipeapi-backend.onrender.com/";

export async function fetchSummary(temperature, pressure) {
  const res = await fetch(`${BASE_URL}/api/summary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ temperature, pressure }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error);

  return data;
}

export async function fetchChart(temp, pressure) {
  const res = await fetch(
    `${BASE_URL}/api/chart?temperature=${temp}&pressure=${pressure}`
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.error);

  return data.data;
}

export async function fetchHistory() {
  const res = await fetch(`${BASE_URL}/api/history`);

  const data = await res.json();

  return data.data;
}