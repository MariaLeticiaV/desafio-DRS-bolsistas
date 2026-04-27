import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ResultsChart({ data }) {
  return (
    <section className="chart-section">
      <h2>Gráfico de Resultados</h2>

      <div className="chart-box">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="temperature" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ResultsChart;