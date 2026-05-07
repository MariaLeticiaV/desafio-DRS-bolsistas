import { useState } from "react";

const faqData = [
  {
    question: "O que é Thermo Buckling?",
    answer:
      "Thermo Buckling é um fenômeno de flambagem causado pela expansão térmica em tubulações submetidas a altas temperaturas e restrições estruturais.",
  },
  {
    question: "Como o cálculo é realizado?",
    answer:
      "Os cálculos utilizam temperatura e pressão para estimar momento fletor, tensão e deslocamento da tubulação.",
  },
  {
    question: "Como o gráfico é gerado?",
    answer:
      "O gráfico é construído dinamicamente a partir dos resultados calculados pela API e renderizado com Recharts.",
  },
  {
    question: "O que significa momento fletor?",
    answer:
      "É o esforço responsável pela tendência de curvatura da tubulação.",
  },
  {
    question: "O que significa status estável?",
    answer:
      "Indica que os valores calculados estão dentro da faixa considerada segura para operação.",
  },
  {
    question: "Como temperatura e pressão influenciam?",
    answer:
      "Quanto maiores os valores de temperatura e pressão, maiores tendem a ser os esforços estruturais na tubulação.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2>Possíveis dúvidas</h2>

        {faqData.map((item, index) => (
          <div className="faq-item" key={index}>
            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              <span>{item.question}</span>

              <span className="faq-icon">
                {openIndex === index ? "ˆ" : "ˇ"}
              </span>
            </button>

            {openIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}