const txtHours = document.getElementById("hours")
const txtMinutes = document.getElementById("minutes") 
const txtSeconds = document.getElementById("seconds") 
const txtMilisseconds = document.getElementById("miliseconds")
let startTime = 0;
let isRunning = false
let elapsedTime = 0;
let timerInterval;

const startButton = document.getElementById("startButton")
startButton.addEventListener("click", startTimer)

const stopButton = document.getElementById("stopButton")
stopButton.addEventListener("click", stopTimer)

const resetButton = document.getElementById("resetButton")
resetButton.addEventListener("click", () => {
    isRunning = false
    clearInterval(timerInterval)
    startTime = 0;
    elapsedTime = 0;

    txtHours.textContent = "00"
    txtMinutes.textContent = "00"
    txtSeconds.textContent = "00"
    txtMilisseconds.textContent = "00"
})

function startTimer(){
    if (!isRunning) {
        isRunning = true
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 10)
    }
}

function stopTimer(){
    if (isRunning) {
        elapsedTime = Date.now() - startTime;
        isRunning = false
        clearInterval(timerInterval)
    }
}

function updateTimer() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const miliseconds = Math.floor((elapsedTime % 1000) / 10);

    txtHours.textContent = String(hours).padStart(2, "0");
    txtMinutes.textContent = String(minutes).padStart(2, "0");
    txtSeconds.textContent = String(seconds).padStart(2, "0");
    txtMilisseconds.textContent = String(miliseconds).padStart(2, "0");
}