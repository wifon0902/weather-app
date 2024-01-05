import { config } from "./config.js";

const API_KEY = config.API_KEY;
const button = document.querySelector("#check-button");

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
        sunrise: weatherRaw.sys.sunrise,
        sunshine: weatherRaw.sys.sunset,
        weather: weatherRaw.weather[0].main,
        weatherDesc: weatherRaw.weather[0].description,
      };
      console.log(weatherRaw);
    });
}
