const addBtn = document.getElementById("addNumber");
const nbrContainer = document.getElementById("numberList");
const output = document.getElementById("results");
const resultBtn = document.getElementById("generate");

addBtn.addEventListener("click", addNumber);
resultBtn.addEventListener("click", showResult);

let numberList = [];
function addNumber() {
  let nbr = Number(document.getElementById("nbr").value);
  if (numberList.indexOf(nbr) !== -1) {
    window.alert("O número já está na lista");
  } else {
    numberList.push(nbr);
    numberList.sort((a, b) => a - b);
    const listItem = document.createElement("li");
    listItem.textContent = nbr;
    nbrContainer.appendChild(listItem);
  }
}

function showResult() {
  nbrContainer.innerHTML = "";
  output.innerHTML = "";

  output.innerHTML = `<p>Ao todo temos ${
    numberList.length
  } números cadastrados.</p>
   <p>O maior número cadastrado é ${numberList[numberList.length - 1]}</p>
   <p>O menor número cadastrado é ${numberList[0]}</p>
   <p>A soma entre os números cadastrados é ${soma()}</p>
   <p>A média entre os números cadastrados é ${media()}</p>
  `;
  numberList = [];
}

function soma() {
  let sum = 0;
  for (let num in numberList) {
    sum += numberList[num];
  }
  return sum;
}

function media() {
  const sum = soma();
  if (numberList.length == 0) {
    return 0;
  } else {
    const average = sum / numberList.length;
    return average.toFixed(2);
  }
}