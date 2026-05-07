function HistoryTable({ data }) {
  return (
    <section className="history-section">
      <div className="history-container">
        <h2>Histórico</h2>

        <table className="history-table">
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
                <td>{item.temperature}</td>

                <td>{item.pressure}</td>

                <td>{item.momento}</td>

                <td>{item.tensao}</td>

                <td>{item.deslocamento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default HistoryTable;