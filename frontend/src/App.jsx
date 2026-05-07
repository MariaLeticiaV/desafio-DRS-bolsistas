import { useState } from "react";

import Header from "./components/Header";
import InputCard from "./components/InputCard";
import ResultCard from "./components/ResultCard";
import ResultsChart from "./components/ResultsChart";
import HistoryTable from "./components/HistoryTable";
import FAQSection from "./components/FAQSection";

import {
  fetchSummary,
  fetchChart,
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

      console.log(
        "SUMMARY RESPONSE:",
        summaryResponse
      );

      const result =
        summaryResponse.result ||
        summaryResponse;

      console.log("RESULT:", result);

      setSummary(result);

      setChartData(chartResponse);

      const momentoValue =
        result.moment ??
        result.momento ??
        result.momento_fletor ??
        result.bending_moment ??
        result.bending_moment__kNm;

      const tensaoValue =
        result.stress ??
        result.tensao ??
        result.compressive_stress__MPa;

      const deslocamentoValue =
        result.displacement ??
        result.deslocamento ??
        result.lateral_displacement__m;

      const newHistoryItem = {
        temperature: `${temp} °C`,

        pressure: `${pressure} bar`,

        momento:
          momentoValue !== undefined
            ? `${Number(
                momentoValue
              ).toFixed(4)} kNm`
            : "-",

        tensao:
          tensaoValue !== undefined
            ? `${Number(
                tensaoValue
              ).toFixed(4)} MPa`
            : "-",

        deslocamento:
          deslocamentoValue !== undefined
            ? `${Number(
                deslocamentoValue
              ).toFixed(4)} m`
            : "-",
      };

      setHistory((prev) =>
        [newHistoryItem, ...prev].slice(0, 5)
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

      <section className="input-section">
        <InputCard
          temp={temp}
          pressure={pressure}
          onTempChange={setTemp}
          onPressureChange={setPressure}
          onSubmit={handleGenerateAnalysis}
          loading={loading}
        />
      </section>

    
      {pageError && (
        <p className="error-message">
          {pageError}
        </p>
      )}

      <section className="results-layout">
        <div className="results-column">
          <ResultCard
            result={summary}
            pressure={pressure}
          />
        </div>

        <div className="chart-column">
          {chartData.length > 0 && (
            <ResultsChart data={chartData} />
          )}
        </div>
      </section>

      {history.length > 0 && (
        <section className="history-section">
          <HistoryTable data={history} />

          <FAQSection />
        </section>
      )}
    </main>
  );
}

export default App;