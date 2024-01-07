import { config } from "./config.js";
import { regionNames } from "./region.js";

const API_KEY = config.API_KEY;
const button = document.querySelector("#search-button");
const searchForm = document.querySelector("#search-form");

const country = document.querySelector("#country");
const cityName = document.querySelector("#city");
const temp = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const weather = document.querySelector("#weather");
const weatherDesc = document.querySelector("#weather-desc");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

button.addEventListener("click", () => {
  let inputCityName = document.querySelector("#search-input").value;
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputCityName}&units=metric&appid=${API_KEY}`;
  dataFetching(API_URL);
});

function dataFetching(API_URL) {
  fetch(API_URL)
    .then((res) => res.json())
    .then((weatherRaw) => {
      let city = {
        name: weatherRaw.name,
        country: weatherRaw.sys.country,
        temp: weatherRaw.main.temp,
        humidity: weatherRaw.main.humidity,
        windSpeed: weatherRaw.wind.speed,
        sunrise: weatherRaw.sys.sunrise,
        sunset: weatherRaw.sys.sunset,
        weather: weatherRaw.weather[0].main,
        weatherDesc: weatherRaw.weather[0].description,
      };
      exportData(city);
      createIcon(city);
      console.log(weatherRaw);
    });
}

function exportData(city) {
  cityName.innerText = city.name;
  country.innerText = regionNames.of(city.country);
  temp.innerText = Math.round(city.temp);
  humidity.innerText = city.humidity + "%";
  let windSpeedConversion = (city.windSpeed / 1000) * 3600;
  windSpeed.innerText = Math.round(windSpeedConversion) + " km/h";
  weatherDesc.innerText = city.weatherDesc;
  sunrise.innerText = unixTimestamp(city.sunrise);
  sunset.innerText = unixTimestamp(city.sunset);

  console.log(city);
}

function createIcon(city) {
  weather.innerHTML = "";
  let icon = document.createElement("img");
  let weatherName = city.weather;
  if (weatherName === "Haze") {
    weatherName = "mist";
  }
  icon.classList.add("weatherIcon");
  icon.src = `icons/${weatherName}.png`;
  weather.appendChild(icon);
}

function unixTimestamp(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  let formattedTime = hours + ":" + minutes;
  return formattedTime;
}
