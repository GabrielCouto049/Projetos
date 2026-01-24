// ======== Calculando Data ===========
const date = new Date();
const currentYear = date.getFullYear();

// ======= Acessando os elementos DOM =========
const yearInput = document.getElementById("anoDeNascimento");
const output = document.getElementById("output");
const btn = document.getElementById("send");
const sex = document.getElementsByName("gender");
const image = document.getElementsByTagName("img")[0];

// ========= Adicionando listeners ===============
btn.addEventListener("click", showRes);

function showRes() {
  // ========= Verificando os dados ==========
  const adn = Number(yearInput.value);

  if (adn < 1900 || adn > currentYear) {
    output.textContent = "Verifique os dados e tente novamente";
    output.style.color = "red"
  } else {
    // =========== Calculando idade ==============
    const age = currentYear - adn;

    // =========== Verificando Gênero ============
    const gender = sex[0].checked ? "homem" : "mulher";

    // =========== Mostrando resultado ===========
    output.innerHTML = `Detectamos um(a) <strong>${gender}</strong> com <strong>${age}</strong> anos de idade`;

    image.style.display = "block"

    // ============ Atualizando imagens ============
    if (gender == "homem") {
      if (age < 12) {
        image.src = "images/man-child.png"
      } else if (age < 18) {
        //teenager
      } else if (age < 32) {
        //young adult
      } else if (age < 60) {
        //adult
      } else {
        //old person
      }
    } else {
      if (age < 12) {
        //child
      } else if (age < 18) {
        //teenager
      } else if (age < 32) {
        //young adult
      } else if (age < 60) {
        //adult
      } else {
        //old person
      }
    }
  }
}