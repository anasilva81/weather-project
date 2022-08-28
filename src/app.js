//Get current date

let todayDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[todayDate.getDay()];
let date = todayDate.getDate();
let months = [
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
let month = months[todayDate.getMonth()];

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${day}, ${date} ${month}`;

//Get current hour

let hour = todayDate.getHours();
if (hour < 10) {
  hours = `0${hours}`;
}
let minutes = todayDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentHour = document.querySelector("#hour");
currentHour.innerHTML = `${hour}:${minutes}`;

//Convert between °C/°F

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  //let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = 23;
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  //let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((23 * 9) / 5 + 32);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

//Display city name after submiting form

function search(event) {
  event.preventDefault();
  let searchField = document.querySelector("#search-input");
  retrieveCityInfo(searchField.value);

  //let h1 = document.querySelector("h1");
  //h1.innerHTML = `${searchField.value}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//Search city

function retrieveCityInfo(city) {
  let units = "metric";
  let apiKey = "39fcb166569b324dfbfd466535557792";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherInfo);
}

//Show current weather info
function displayWeatherInfo(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#curr-description").innerHTML =
    response.data.weather[0].description;

  let currentIcon = document.querySelector("#curr-icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

//Current location button

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "39fcb166569b324dfbfd466535557792";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherInfo);
}

function setCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector("#reset-btn");
button.addEventListener("click", setCurrentLocation);
