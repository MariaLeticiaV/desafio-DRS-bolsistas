import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ResultsChart({ data }) {
  return (
    <div className="chart-card">
      <h2>Gráfico de Resultados</h2>

      <div className="chart-box">
        <ResponsiveContainer width="100%" height={420}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="temperature" />

            <YAxis />

            <Tooltip
              formatter={(value) =>
                `${Number(value).toFixed(2)} kNm`
              }
              labelFormatter={(label) =>
                `Temperatura: ${label} °C`
              }
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#4a90e2"
              strokeWidth={3}
              name="Momento Fletor"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ResultsChart;