const convertBtn = document.getElementById("convertBtn");
const resContainer = document.getElementById("result");

convertBtn.addEventListener("click", showResult);

function showResult() {
  const typedTemp = Number(document.getElementById("temperature").value);
  const unit1 = document.getElementsByTagName("select")[0].value;
  const unit2 = document.getElementsByTagName("select")[1].value;
  let result;

  switch (true) {
    case unit1 === unit2:
      alert("Escolha unidades diferentes.");
      return;
    
    //====== Celsius ======
    case unit1 === "celsius" && unit2 === "fahrenheit":
      result = (typedTemp * 9) / 5 + 32;
      break;
    case unit1 === "celsius" && unit2 === "kelvin":
      result = typedTemp + 273.15;
      break;
    
    //====== Fahrenheit ======
    case unit1 === "fahrenheit" && unit2 === "celsius":
      result = ((typedTemp - 32) * 5) / 9;
      break;
    case unit1 === "fahrenheit" && unit2 === "kelvin":
      result = ((typedTemp - 32) * 5) / 9 + 273.15;
      break;
    
    //====== Kelvin ======
    case unit1 === "kelvin" && unit2 === "celsius":
      result = typedTemp - 273.15;
      break;
    case unit1 === "kelvin" && unit2 === "fahrenheit":
      result = ((typedTemp - 273.15) * 9) / 5 + 32;
      break;
    
    default:
      alert("Algo deu errado.");
      return;
  }
  resContainer.textContent = `${result.toFixed(2)} ${unit2}`;
}
