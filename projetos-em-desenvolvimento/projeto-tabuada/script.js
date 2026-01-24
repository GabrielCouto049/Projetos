  const output = document.getElementById("output");
const btn = document.getElementById("generate");
const errorMessage = document.getElementById("log");

btn.addEventListener("click", showOutput);

function showOutput() {
  output.innerHTML = "";
  errorMessage.textContent = "";
  const number = Number(document.getElementById("nbr").value);

  if (number < 0) {
    errorMessage.textContent = "Valor inválido";
  } else {
    for (let c = 1; c <= 10; c++) {
      const listItem = document.createElement("li");
      output.appendChild(listItem);
      listItem.textContent = `${number} * ${c} = ${number * c}`;
    }
  }
}