const apiBaseUrl = window.CURRCONV_API_BASE_URL || "https://open.er-api.com/v6/latest";
const supportedCurrencies = new Set(["USD", "EUR", "EGP", "KWD", "GBP"]);

const form = document.querySelector("#currency-form");
const amountInput = document.querySelector(".amount");
const fromSelect = document.querySelector(".from");
const toSelect = document.querySelector(".to");
const resultElement = document.querySelector(".result");
const convertButton = document.querySelector("#convert");

function setResult(message, tone = "info") {
  if (!resultElement) return;
  resultElement.textContent = message;
  resultElement.dataset.tone = tone;
}

function formatAmount(value) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value);
}

function readRate(data, currency) {
  const rate = data?.rates?.[currency] ?? data?.conversion_rates?.[currency];
  return typeof rate === "number" && Number.isFinite(rate) && rate > 0 ? rate : null;
}

async function convertCurrency(event) {
  event?.preventDefault();
  if (!amountInput || !fromSelect || !toSelect || !convertButton) return;

  const amount = Number(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (!Number.isFinite(amount) || amount <= 0 || amount > 1_000_000_000_000) {
    setResult("Enter an amount greater than zero and below 1 trillion.", "error");
    amountInput.focus();
    return;
  }
  if (!supportedCurrencies.has(from) || !supportedCurrencies.has(to)) {
    setResult("Choose a supported currency.", "error");
    return;
  }

  if (from === to) {
    setResult(`${formatAmount(amount)} ${from} = ${formatAmount(amount)} ${to}`, "success");
    return;
  }

  convertButton.disabled = true;
  setResult("Loading the latest exchange rate…");
  try {
    const base = new URL(apiBaseUrl);
    base.pathname = `${base.pathname.replace(/\/+$/, "")}/${encodeURIComponent(from)}`;
    base.search = "";
    const response = await fetch(base, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) throw new Error(`Exchange service returned ${response.status}.`);
    const data = await response.json();
    if (data?.result === "error") throw new Error(data["error-type"] || "Exchange service rejected the request.");

    const rate = readRate(data, to);
    if (rate === null) throw new Error("The exchange service returned no rate for this currency.");
    setResult(`${formatAmount(amount)} ${from} = ${formatAmount(amount * rate)} ${to}`, "success");
  } catch (error) {
    const message = error instanceof Error && error.name === "TimeoutError"
      ? "The exchange service timed out. Please try again."
      : "The exchange rate is unavailable right now. Please try again later.";
    setResult(message, "error");
    console.error("Unable to convert currency", error);
  } finally {
    convertButton.disabled = false;
  }
}

form?.addEventListener("submit", convertCurrency);
