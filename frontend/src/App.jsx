import { useEffect, useState } from "react";
import Header from "./components/Header";
import InputCard from "./components/InputCard";
import ResultCard from "./components/ResultCard";
import ResultsChart from "./components/ResultsChart";
import HistoryTable from "./components/HistoryTable";
import { fetchSummary, fetchHistory, fetchChart } from "./services/api";

function App() {
  const [temperature, setTemperature] = useState(50);
  const [pressure, setPressure] = useState(40);
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    async function loadInitialData() {
      try {
        const historyResponse = await fetchHistory();
        const chartResponse = await fetchChart();

        setHistory(historyResponse.data || []);
        setChartData(chartResponse.data || []);
      } catch (error) {
        setPageError(error.message);
      }
    }

    loadInitialData();
  }, []);

  async function handleGenerateAnalysis() {
    try {
      setLoading(true);
      setPageError("");

      const response = await fetchSummary(Number(temperature), Number(pressure));
      setSummary(response.result);
    } catch (error) {
      setPageError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <Header />

      <div className="top-grid">
        <InputCard
          temperature={temperature}
          pressure={pressure}
          onTemperatureChange={setTemperature}
          onPressureChange={setPressure}
          onSubmit={handleGenerateAnalysis}
          loading={loading}
        />

        <ResultCard result={summary} pressure={pressure} />
      </div>

      {pageError && <p className="error-message">{pageError}</p>}

      <ResultsChart data={chartData} />
      <HistoryTable data={history} />
    </div>
  );
}

export default App;