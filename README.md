# 💱 Global Currency Converter

> **Live demo:** [Open CurrConv in your browser](https://9gkc.github.io/CurrConv/)

<div align="center">
  <img src="https://img.shields.io/github/last-commit/9gkc/CurrConv?style=for-the-badge&label=Last%20Update&color=58A6FF" alt="Last Update">
  <img src="https://img.shields.io/github/stars/9gkc/CurrConv?style=for-the-badge&color=58A6FF" alt="GitHub Stars">
  <img src="https://img.shields.io/github/forks/9gkc/CurrConv?style=for-the-badge&color=58A6FF" alt="GitHub Forks">
</div>


![API](https://img.shields.io/badge/API-ExchangeRate-red?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![JSON](https://img.shields.io/badge/Data-JSON-lightgrey?style=for-the-badge)

A high-performance currency conversion tool that connects to live financial data. Perfect for quick global currency calculations with up-to-the-minute accuracy.

## 🚀 Key Features
- **Live Data Fetching**: Integrates with ExchangeRate-API for real-time global rates.
- **Major Currencies**: Pre-configured for USD, EUR, EGP, KWD, and GBP.
- **Error Handling**: Robust logic to handle invalid input, network issues, timeouts, or API failures gracefully.
- **Precision**: Calculations are rounded to two decimal places for display.
- **Accessible UX**: Labeled fields, keyboard-friendly submission, and live result announcements.
- **No Browser Secret**: The client contains no API key. Configure a server-side proxy or a public no-key endpoint instead.

## 🛠️ Installation & Usage
1. Clone the repository: `git clone https://github.com/9gkc/CurrConv.git`
2. Serve the static files over HTTP and open `index.html` (a local file URL may block fetch requests).
3. The default endpoint is `https://open.er-api.com/v6/latest/{FROM}`. To use a server-side proxy, define `window.CURRCONV_API_BASE_URL` before `main.js` and keep any provider key on the server, never in this repository or browser code.
4. The converter currently accepts USD, EUR, EGP, KWD, and GBP and validates the amount before requesting a rate.

---
