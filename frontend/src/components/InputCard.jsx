function InputCard({
  temperature,
  pressure,
  onTemperatureChange,
  onPressureChange,
  onSubmit,
  loading,
}) {
  return (
    <section className="card input-card">
      <h2>Parâmetros de Entrada</h2>

      <div className="field">
        <label>Temperatura:</label>
        <input
          type="number"
          value={temperature}
          onChange={(e) => onTemperatureChange(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Pressão:</label>
        <input
          type="number"
          value={pressure}
          onChange={(e) => onPressureChange(e.target.value)}
        />
      </div>

      <button onClick={onSubmit} disabled={loading}>
        {loading ? "Carregando..." : "Gerar análise →"}
      </button>
    </section>
  );
}

export default InputCard;