// ================= ELEMENTOS DOM =================
const resultsContainer = document.getElementById("results");
const cityNameInput = document.getElementById("city-input");
const cityNameContainer = document.getElementById("city-name");

const tempElements = document.getElementsByClassName("degrees");
const unitElements = document.getElementsByClassName("unity");
const weatherIcons = document.querySelectorAll(".weather-icon");

const windSpeedContainer = document.getElementById("wind-speed");
const humidityContainer = document.getElementById("humidity");
const visibilityContainer = document.getElementById("visibility");

const weekDayContainer = document.getElementById("weekday");
const monthContainer = document.getElementById("month");
const dayContainer = document.getElementById("day");

// ================= ESTADO =================
let kelvinTemp = 0;
let currentUnit = "celsius";
const API_KEY = "MY API KEY 😅";

// ================= EVENTOS =================
unitElements[0].addEventListener("click", toggleUnit);

document
  .getElementById("search-button")
  .addEventListener("click", handleSearch);

// ================= FUNÇÕES =================

function handleSearch() {
  const cityName = cityNameInput.value.trim();

  if (!cityName) {
    console.error("Invalid city name");
    return;
  }

  findCity(cityName);
  cityNameInput.value = "";
}

// --------- ALTERAR DATA ------------

function updateDate() {
  const currentDate = new Date();

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDay = weekDays[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();

  weekDayContainer.textContent = weekDay;
  monthContainer.textContent = month;
  dayContainer.textContent = day;
}

setInterval(updateDate, 60000);

// --------- ALTERAR UNIDADE ---------
function toggleUnit() {
  const units = ["celsius", "fahrenheit", "kelvin"];
  const symbols = ["°C", "°F", "°K"];

  const currentIndex = units.indexOf(currentUnit);
  const nextIndex = (currentIndex + 1) % units.length;

  currentUnit = units[nextIndex];

  updateUnitSymbol(symbols[nextIndex]);
  updateTemperature();
}

function updateUnitSymbol(symbol) {
  for (let element of unitElements) {
    element.textContent = symbol;
  }
}

// --------- BUSCAR CIDADE ---------
async function findCity(cityName) {
  try {
    const { lat, lon, name } = await getCityCoordinates(cityName);

    cityNameContainer.textContent = name;

    const weatherData = await getWeatherData(lat, lon);

    renderWeather(weatherData);
  } catch (error) {
    console.error(error);
  }
}

async function getCityCoordinates(cityName) {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
  );

  if (!response.ok) throw new Error("City not found");

  const data = await response.json();

  if (!data.length) throw new Error("City not found");

  return data[0];
}

async function getWeatherData(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  if (!response.ok) throw new Error("Weather data not found");

  return response.json();
}

// --------- RENDERIZAR DADOS ---------
function renderWeather(weatherData) {
  kelvinTemp = weatherData.main.temp;
  updateTemperature();

  windSpeedContainer.textContent = Math.trunc(weatherData.wind.speed * 3.6);
  humidityContainer.textContent = weatherData.main.humidity;
  visibilityContainer.textContent = Math.trunc(weatherData.visibility / 1000);

  changeIcon(weatherData.weather[0].main);

  resultsContainer.style.display = "block";
}

// --------- TEMPERATURA ---------
function convertTemperature(kelvin) {
  switch (currentUnit) {
    case "celsius":
      return kelvin - 273.15;
    case "fahrenheit":
      return ((kelvin - 273.15) * 9) / 5 + 32;
    case "kelvin":
      return kelvin;
  }
}

function updateTemperature() {
  const temp = Math.trunc(convertTemperature(kelvinTemp));

  for (let element of tempElements) {
    element.textContent = temp;
  }
}

// --------- ÍCONES ---------
function changeIcon(status) {
  weatherIcons.forEach((icon) => icon.classList.add("hidden"));

  const statusMap = {
    Clear: 0,
    Clouds: 1,
    Rain: 2,
    Thunderstorm: 3,
    Mist: 4,
    Haze: 5,
  };

  if (statusMap[status] !== undefined) {
    weatherIcons[statusMap[status]].classList.remove("hidden");
  }
}