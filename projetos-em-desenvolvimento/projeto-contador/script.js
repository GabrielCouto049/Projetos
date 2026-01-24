const output = document.getElementById("output");

const decButton = document.getElementById("decrement");

const resButton = document.getElementById("reset");

const incButton = document.getElementById("increment");

decButton.addEventListener("click", decrement);
resButton.addEventListener("click", reset);
incButton.addEventListener("click", increment);

let currentNumber = 0;

function decrement() {
  currentNumber--;
  output.textContent = currentNumber;
}

function reset() {
  currentNumber = 0;
  output.textContent = currentNumber;
}

function increment() {
  currentNumber++;
  output.textContent = currentNumber;
}
