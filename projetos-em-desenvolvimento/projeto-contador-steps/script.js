const btn = document.getElementById("send");
const output = document.getElementById("output");

btn.addEventListener("click", showResult);

function showResult() {
  const step = Number(document.getElementById("step").value)
  const start = Number(document.getElementById("start").value)
  const end = Number(document.getElementById("end").value)
   let res = ""

  if (step <= 0 || start === end) {
    res = "Verifique os dados e tente novamente"
  } else if (start > end) {
    for (let c=start; c >= end; c-=step){
        res += `${c} \u{1f449} `
    }
    res += "Fim"
  } else {
    for (let c=start; c <= end; c+=step){
        res += `${c} \u{1f449} `
    }
    res += `\u{1f3c1}`
  }
  output.textContent = res 
}
