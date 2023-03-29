let now = new Date();
let h3 = document.querySelector("h3");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = now.getDay();
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h3.innerHTML = `Last Updated: ${days[day]}
${hour}:${minutes}`;
function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  forecastHTML =
    forecastHTML +
    `  
    <div class = "col-2">
      <div class = "weather-forecast-date">
      Fri
      </div>
      <img src = "https://openweathermap.org/img/wn/10d@2x.png"
      alt = ""
      width = "38"
      />
      <div class = "weather-forecast-temperatures">
        <span class = "weather-forecast-temperatures-max">
      18℉ </span>
      <span class = "weather-forecast-temperature-min">
      12℉</span>
    </div>
    <div class = "col-2">
    </div>
    
</div>`;
  forecastHTML =
    forecastHTML +
    `  
    <div class = "col-2">
      <div class = "weather-forecast-date">
      Fri
      </div>
      <img src = "https://openweathermap.org/img/wn/10d@2x.png"
      alt = ""
      width = "38"
      />
      <div class = "weather-forecast-temperatures">
        <span class = "weather-forecast-temperatures-max">
      18℉ </span>
      <span class = "weather-forecast-temperature-min">
      12℉</span>
      </div>
    </div>`;
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}
function handleCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  searchCity(searchInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleCity);
function searchCity(city) {
  let apiKey = "50fa4024e3b1d5eac2f51ab18a47e997";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function getForcast(coordinates) {
  console.log(coordinates);
  apiKey = "50fa4024e3b1d5eac2f51ab18a47e997";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response.data);
  let cityName = document.querySelector("#city");
  cityName.innerHTML = `${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
  temperatureElement.innerHTML = `${temperature}°F`;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForcast(response.data.coord);
}

function handlePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}
navigator.geolocation.getCurrentPosition(handlePosition);
searchCity("Grants Pass");
