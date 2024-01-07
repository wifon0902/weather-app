import { config } from "./config.js";
import { regionNames } from "./region.js";

const API_KEY = config.API_KEY;
const button = document.querySelector("#search-button");
const searchForm = document.querySelector("#search-form");

const country = document.querySelector("#country");
const cityName = document.querySelector("#city");
const temp = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");
const pressure = document.querySelector("#pressure");
const windSpeed = document.querySelector("#wind-speed");
const windDeg = document.querySelector("#wind-deg");
const weather = document.querySelector("#weather");
const weatherDesc = document.querySelector("#weather-desc");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const timestamp = document.querySelector("#timestamp");

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
        pressure: weatherRaw.main.pressure,
        windSpeed: weatherRaw.wind.speed,
        windDeg: weatherRaw.wind.speed,
        sunrise: weatherRaw.sys.sunrise,
        sunset: weatherRaw.sys.sunset,
        weather: weatherRaw.weather[0].main,
        weatherDesc: weatherRaw.weather[0].description,
        timestamp: weatherRaw.dt,
        timezone: weatherRaw.timezone,
      };

      exportData(city);
      createIcon(city);
      console.log(weatherRaw);
    });
}

function currentTime(city) {
  let dateTime = new Date(
    city.timestamp * 1000 + (city.timezone - 3600) * 1000
  );
  let hour = dateTime.getHours();
  let minutes = (dateTime.getMinutes() < 10 ? "0" : "") + dateTime.getMinutes();
  let weekday = dateTime.toLocaleString("en-us", { weekday: "long" });
  let date = dateTime.getDate();

  return `${weekday} ${date} • ${hour}:${minutes}`;
}

function sunTimestamp(timestamp, timezone) {
  let date = new Date(timestamp * 1000 + (timezone - 3600) * 1000);
  let hours = date.getHours();
  let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  let formattedTime = hours + ":" + minutes;
  return formattedTime;
}

function exportData(city) {
  cityName.innerText = city.name;
  country.innerText = regionNames.of(city.country);
  temp.innerText = Math.round(city.temp);
  humidity.innerText = city.humidity + "%";
  pressure.innerText = city.pressure + " hPa";
  let windSpeedConversion = (city.windSpeed / 1000) * 3600;
  windSpeed.innerText = Math.round(windSpeedConversion) + " km/h";
  windDeg.innerText = Math.round(windSpeedConversion) + "°";
  weatherDesc.innerText = city.weatherDesc;
  sunrise.innerText = sunTimestamp(city.sunrise, city.timezone);
  sunset.innerText = sunTimestamp(city.sunset, city.timezone);
  timestamp.innerText = currentTime(city);

  console.log(city);
}

function createIcon(city) {
  weather.innerHTML = "";
  let icon = document.createElement("img");
  let weatherName = city.weather;
  if (weatherName === "Haze") {
    weatherName = "mist";
  } else if (weatherName === "Drizzle") {
    weatherName = "rain";
  }
  icon.classList.add("weatherIcon");
  icon.src = `icons/${weatherName}.png`;
  weather.appendChild(icon);
}
