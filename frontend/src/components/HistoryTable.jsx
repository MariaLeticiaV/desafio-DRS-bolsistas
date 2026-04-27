function HistoryTable({ data }) {
  return (
    <section className="table-section">
      <h2>Histórico / Tabela de pontos avaliados</h2>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Temp</th>
              <th>Pressão</th>
              <th>Momento</th>
              <th>Tensão</th>
              <th>Deslocamento</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.temp}</td>
                <td>{item.pressure}</td>
                <td>{item.moment}</td>
                <td>{item.stress}</td>
                <td>{item.displacement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default HistoryTable;