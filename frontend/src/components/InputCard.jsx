function InputCard({
  temp,
  pressure,
  onTempChange,
  onPressureChange,
  onSubmit,
  loading,
}) {
  const tempNumber = Number(temp);
  const pressureNumber = Number(pressure);

  const tempInvalid =
    temp !== "" &&
    (tempNumber < 20 || tempNumber > 120);

  const pressureInvalid =
    pressure !== "" &&
    (pressureNumber < 20 || pressureNumber > 62);

  return (
    <section className="card input-card">
      <h2>Parâmetros de Entrada</h2>

      <div className="field">
        <label>Temperatura:</label>

        <div className="input-wrapper">
          <input
            type="number"
            placeholder="Ex: 60"
            value={temp}
            onChange={(e) =>
              onTempChange(e.target.value)
            }
            className={
              tempInvalid
                ? "input-error"
                : ""
            }
          />

          {tempInvalid && (
            <span className="validation-error">
              Temperatura entre 20 e 70
            </span>
          )}
        </div>
      </div>

      <div className="field">
        <label>Pressão:</label>

        <div className="input-wrapper">
          <input
            type="number"
            placeholder="Ex: 40"
            value={pressure}
            onChange={(e) =>
              onPressureChange(e.target.value)
            }
            className={
              pressureInvalid
                ? "input-error"
                : ""
            }
          />

          {pressureInvalid && (
            <span className="validation-error">
              Pressão entre 20 e 62
            </span>
          )}
        </div>
      </div>

      <button
        className="generate-button"
        onClick={onSubmit}
        disabled={
          loading ||
          tempInvalid ||
          pressureInvalid ||
          !temp ||
          !pressure
        }
      >
        {loading
          ? "Gerando..."
          : "Gerar análise"}
      </button>
    </section>
  );
}

export default InputCard;