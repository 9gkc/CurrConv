function convertCurrency() {
  const amount = document.querySelector(".amount").value;
  const from = document.querySelector(".from").value;
  const to = document.querySelector(".to").value;
  const resultDiv = document.querySelector(".result");

  if (amount && from && to) {
    fetch(`https://v6.exchangerate-api.com/v6/5bd6153de422808f1b23ba32/latest/${from}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const rate = data.conversion_rates[to];
        const result = (amount * rate).toFixed(2);
        resultDiv.innerHTML = `${amount} ${from} = ${result} ${to}`;
      })
      .catch((error) => {
        resultDiv.innerHTML = `Something Went Wrong ${error}`;
      });
  } else {
    resultDiv.innerHTML = "Please Fill All Fields";
  }
}
