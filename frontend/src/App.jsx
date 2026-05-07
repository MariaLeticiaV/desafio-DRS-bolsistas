import { useState } from "react";

import Header from "./components/Header";
import InputCard from "./components/InputCard";
import ResultCard from "./components/ResultCard";
import ResultsChart from "./components/ResultsChart";
import HistoryTable from "./components/HistoryTable";

import {
  fetchSummary,
  fetchChart,
  fetchHistory,
} from "./services/api";

import "./styles/global.css";

function App() {
  const [temp, setTemp] = useState("");
  const [pressure, setPressure] = useState("");

  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(false);

  const [pageError, setPageError] = useState("");

  async function handleGenerateAnalysis() {
    try {
      setLoading(true);

      setPageError("");

      const summaryResponse = await fetchSummary(
        temp,
        pressure
      );

      const chartResponse = await fetchChart(
        temp,
        pressure
      );

      const historyResponse =
        await fetchHistory();

      console.log(
        "SUMMARY RESPONSE:",
        summaryResponse
      );

      setSummary(summaryResponse.result);

      setChartData(chartResponse);

      setHistory(
        [...historyResponse]
          .reverse()
          .slice(0, 5)
      );
    } catch (error) {
      console.error(error);

      setPageError(
        "Erro ao buscar dados da API"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <Header />

      <section className="top-grid">
        <InputCard
          temp={temp}
          pressure={pressure}
          onTempChange={setTemp}
          onPressureChange={setPressure}
          onSubmit={handleGenerateAnalysis}
          loading={loading}
        />

        <ResultCard
          result={summary}
          pressure={pressure}
        />
      </section>

      {pageError && (
        <p className="error-message">
          {pageError}
        </p>
      )}

      {chartData.length > 0 && (
        <ResultsChart data={chartData} />
      )}

      {history.length > 0 && (
        <HistoryTable data={history} />
      )}
    </main>
  );
}

export default App;