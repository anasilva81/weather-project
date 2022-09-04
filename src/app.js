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
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function showFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

//Display city name after submiting form

function search(event) {
  event.preventDefault();
  let searchField = document.querySelector("#search-input");
  retrieveCityInfo(searchField.value);
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

//Get forecast based on coordinates
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  https: axios.get(apiUrl).then(displayForecast);
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
    `./images/${response.data.weather[0].icon}.png`
  );
  currentIcon.setAttribute("alt", "message");

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
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

//Format day

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

//Display forecast

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  document.querySelector("#curr-min-temp").innerHTML = Math.round(
    forecast[0].temp.min
  );

  document.querySelector("#curr-max-temp").innerHTML = Math.round(
    forecast[0].temp.max
  );

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="card-day">${formatDay(forecastDay.dt)}</div>
        <img 
          src="./images/${forecastDay.weather[0].icon}.png"
          alt=""
          width="50"
          height="50"
          class="card-icon"
        />
        <p class="card-descr">
            ${forecastDay.weather[0].description}
        </p>
        <div class="card-temp">
          <span class="weather-forecast-temperature-min" id="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
          <span class="weather-forecast-temperature-max" id="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

retrieveCityInfo("Porto");
