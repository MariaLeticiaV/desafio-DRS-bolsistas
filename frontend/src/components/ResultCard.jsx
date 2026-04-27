function ResultCard({ result, pressure }) {
  return (
    <section className="card result-card">
      <h2>Resultado da Simulação</h2>

      <div className="result-row">
        <span>Momento fletor:</span>
        <strong>{result?.bending_moment__kNm ?? "-"}</strong>
      </div>

      <div className="result-row">
        <span>Pressão:</span>
        <strong>{pressure || "-"}</strong>
      </div>

      <div className="result-row">
        <span>Tensão comp.:</span>
        <strong>{result?.compressive_stress__MPa ?? "-"}</strong>
      </div>

      <div className="result-row">
        <span>Deslocamento:</span>
        <strong>{result?.lateral_displacement__m ?? "-"}</strong>
      </div>

      <div className="result-row">
        <span>Status:</span>
        <strong>{result?.status ?? "-"}</strong>
      </div>
    </section>
  );
}

export default ResultCard;