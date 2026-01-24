const hours = document.querySelector("#hours")
const image = document.getElementsByTagName("img")[0]
const title = document.getElementsByTagName("h1")[0]
const text = document.querySelector("footer>p")
const link = document.querySelector("p>a")
const body = document.body

const time = new Date()
let currentTime =  time.getHours()

hours.innerHTML = currentTime

if (currentTime <= 12) {
    body.style.backgroundColor = "hsl(33, 80%, 55%)"
    image.src = "images/day.jpg"
} else if (currentTime < 20){
    body.style.backgroundColor = "hsl(27, 44%, 50%)"
    image.src = "images/afternoon.jpg"
} else {
    title.style.color = "white"
    text.style.color = "white"
    link.style.color = "white"
    body.style.backgroundColor = "hsl(270, 22%, 40%)"
    image.src = "images/night.jpg"
}
