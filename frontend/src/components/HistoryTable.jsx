function HistoryTable({ data }) {
  return (
    <section className="table-section">
      <h2>Histórico</h2>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Temperatura</th>
              <th>Pressão</th>
              <th>Momento</th>
              <th>Tensão</th>
              <th>Deslocamento</th>
            </tr>
          </thead>

          <tbody>
  {data.map((item, index) => (
    <tr key={index}>
      <td>
        {Number(item.temperature).toFixed(0)} °C
      </td>

      <td>
        {Number(item.pressure).toFixed(0)} bar
      </td>

      <td>
        {Number(item.moment).toFixed(3)} kNm
      </td>

      <td>
        {Number(item.stress).toFixed(3)} MPa
      </td>

      <td>
        {Number(item.displacement).toFixed(3)} m
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </section>
  );
}

export default HistoryTable;