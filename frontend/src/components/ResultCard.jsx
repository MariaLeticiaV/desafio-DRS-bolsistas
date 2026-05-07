function ResultCard({ result, pressure }) {
  return (
    <section className="card">
      <h2>Resultado da Simulação</h2>

      <div className="result-grid">

        <div className="result-box">
          <span className="label">
            Momento fletor
          </span>

          <span className="value">
            {result?.bending_moment__kNm
              ? `${Number(
                  result.bending_moment__kNm
                ).toFixed(2)} kNm`
              : "- kNm"}
          </span>
        </div>

        <div className="result-box">
          <span className="label">
            Pressão
          </span>

          <span className="value">
            {pressure || "-"}
          </span>
        </div>

        <div className="result-box">
          <span className="label">
            Tensão
          </span>

          <span className="value">
            {result?.compressive_stress__MPa
              ? `${Number(
                  result.compressive_stress__MPa
                ).toFixed(2)} MPa`
              : "- MPa"}
          </span>
        </div>

        <div className="result-box">
          <span className="label">
            Deslocamento
          </span>

          <span className="value">
            {result?.lateral_displacement__m
              ? `${Number(
                  result.lateral_displacement__m
                ).toFixed(2)} m`
              : "- m"}
          </span>
        </div>

        <div className="result-box status">
          <span className="label">
            Status
          </span>

          <span className="value">
            Estável
          </span>
        </div>

      </div>
    </section>
  );
}

export default ResultCard;