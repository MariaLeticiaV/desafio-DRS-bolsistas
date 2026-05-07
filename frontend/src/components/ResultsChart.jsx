import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function ResultsChart({ data }) {
  console.log("DATA NO GRÁFICO:", data); 

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
            <Legend />

            <Line
              type="monotone"
              dataKey="value"
              name="Momento Fletor"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ResultsChart;