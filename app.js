import { config } from "./config.js";
import { regionNames } from "./region.js";

const API_KEY = config.API_KEY;
const button = document.querySelector("#check-button");

const country = document.querySelector("#country");
const cityName = document.querySelector("#city");
const temp = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const weather = document.querySelector("#weather");
const weatherDesc = document.querySelector("#weather-desc");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");

button.addEventListener("click", () => {
  let inputCityName = document.querySelector("#city-name").value;
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
      console.log(weatherRaw);
    });
}

function exportData(city) {
  cityName.innerText = city.name;
  country.innerText = regionNames.of(city.country);
  temp.innerText = Math.round(city.temp);
  humidity.innerText = city.humidity;
  let windSpeedConversion = (city.windSpeed / 1000) * 3600;
  windSpeed.innerText = Math.round(windSpeedConversion);
  weather.innerText = city.weather;
  weatherDesc.innerText = city.weatherDesc;
  sunrise.innerText = unixTimestamp(city.sunrise);
  sunset.innerText = unixTimestamp(city.sunset);

  console.log(city);
  createIcon();
}

function createIcon() {
  let icon = document.createElement("img");
  icon.classList.add("weatherIcon");
  icon.src = "icons/cloud.png";
  weather.appendChild(icon);
}

function unixTimestamp(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let formattedTime = hours + ":" + minutes;
  return formattedTime;
}
