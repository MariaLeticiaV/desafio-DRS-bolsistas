# PipeAPI Thermo Buckling Dashboard

## 📌 Sobre o Projeto

Este projeto consiste em um dashboard web interativo para simulação e visualização de análises de **Thermo Buckling** utilizando integração com a PipeAPI.

A aplicação permite:

- Inserção de parâmetros de entrada
- Geração de análises estruturais
- Visualização gráfica dos resultados
- Histórico das últimas simulações
- Integração com API real hospedada no Render

---

# 🚀 Tecnologias Utilizadas

## Frontend

- React
- Vite
- Recharts
- CSS3

## Backend

- Flask
- Python
- Requests
- Flask-CORS
- Gunicorn

---

# 📊 Funcionalidades

## ✅ Simulação de Thermo Buckling

O usuário pode informar:

- Temperatura
- Pressão

E gerar:

- Momento fletor
- Tensão compressiva
- Deslocamento lateral
- Status da análise

---

## 📈 Visualização Gráfica

O dashboard apresenta um gráfico responsivo com:

- Temperatura no eixo X
- Momento Fletor no eixo Y
- Legendas e tooltips interativos

---

## 🕓 Histórico Real

O sistema mantém um histórico das últimas análises realizadas:

- Ordenação da mais recente para a mais antiga
- Exibição limitada aos últimos 5 registros
- Valores formatados com 4 casas decimais
- Exibição das unidades de medida

---

# 🖥️ Estrutura do Projeto

```bash
desafio-DRS-Bolsistas/
│
├── backend/
│   ├── services/
│   ├── utils/
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# ⚙️ Como Executar o Projeto

## 🔹 Frontend

Acesse a pasta frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

---

# 🌐 Acesso

Após iniciar o frontend:

```bash
http://localhost:5173
```

---

# ☁️ Backend Hospedado

O backend da aplicação está hospedado no Render e já configurado no frontend. Portanto, não é necessário executar o backend localmente para utilizar o sistema.

URL da API:

```txt
https://pipeapi-backend.onrender.com
```

---

# 📡 Endpoints da API

## POST `/api/summary`

Responsável pela geração da análise principal.

### Body

```json
{
  "temperature": 60,
  "pressure": 40
}
```

---

## POST `/api/chart`

Retorna os dados utilizados no gráfico.

### Query Params

```bash
/api/chart?temperature=60&pressure=40
```

---

## POST `/api/history`

Retorna o histórico das análises realizadas.

