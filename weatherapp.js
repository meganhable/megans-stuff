let now = new Date();
let h3 = document.querySelector("h3");
let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = now.getDay();
let hour = now.getHours();
let minutes = now.getMinutes();
h3.innerHTML = `${day}
${hour}:${minutes}`;
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
  let apiKey = "dbc89cfc120fa39793a3125b6b72ede2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function showTemperature(response) {
  console.log(response);
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
}
function showDescription(response) {
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = $(response.data.main.humidity);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let h2 = document.querySelector(h2);
  h2.innerHTML = `${humidity}% ${wind}MPH`;
}
function handlePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}
navigator.geolocation.getCurrentPosition(handlePosition);
