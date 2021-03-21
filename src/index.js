//import "./styles.css";

window.onload = navigator.geolocation.getCurrentPosition(getTemperatureCurrent)

let now = new Date();

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

minutes = addZero(minutes);
hours = addZero(hours);

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

document.getElementById(
  "current"
).innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}`;

function signUpFull() {
  let heading = document.querySelector("#maintitle");
  let myCity = document.querySelector("#input-city");
  let myCityCAPS = capitalizeFirstLetter(myCity.value);
  heading.innerHTML = "The weather in " + myCityCAPS;
  getTemperature(myCity.value);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let searchCity = document.querySelector("#search-button");
searchCity.addEventListener("click", signUpFull);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let tempC = temperatureElement.innerHTML;
  let tempF = (tempC * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(tempF);
  fahrenheitLink.removeEventListener("click", convertToFahrenheit);
  celsiusLink.addEventListener("click", convertToCelsius);
  celsiusLink.style.opacity = "0.5";
  fahrenheitLink.style.cursor = "auto"
  fahrenheitLink.style.color = "white";
  fahrenheitLink.style.opacity = "1";
  celsiusLink.style.cursor = "pointer"
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let tempF = temperatureElement.innerHTML;
  let tempC = (tempF - 32) * 0.5556;
  temperatureElement.innerHTML = Math.round(tempC);
  celsiusLink.removeEventListener("click", convertToCelsius);
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  fahrenheitLink.style.opacity = "0.5";
  fahrenheitLink.style.cursor = "pointer"
  celsiusLink.style.color = "white";
  celsiusLink.style.cursor = "auto"
  celsiusLink.style.opacity = "1";
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function showWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let iconElement = document.querySelector("#icon");
  let temperature = Math.round(response.data.main.temp);
  let weathericon = response.data.weather[0].icon;
  let windspeed = response.data.wind.speed;
  let windtext = document.querySelector("#windspeed");
  let humidity = response.data.main.humidity;
  let humiditytext = document.querySelector("#humidity");
  temperatureElement.innerHTML = temperature;
  celsiusLink.removeEventListener("click", convertToCelsius);
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  fahrenheitLink.style.opacity = "0.5";
  celsiusLink.style.cursor = "auto"
  fahrenheitLink.style.cursor = "pointer"
  celsiusLink.style.color = "white";
  celsiusLink.style.opacity = "1";
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weathericon}@2x.png`
  );
  windtext.innerHTML = windspeed + " m/s";
  humiditytext.innerHTML = humidity + " %";
}

function userLocation() {
  navigator.geolocation.getCurrentPosition(getTemperatureCurrent);
}

function formatTime(datestamp) {
  let datetime = new Date(datestamp);
  let hours = datetime.getHours();
  let minutes = datetime.getMinutes();
  hours = addZero(hours);
  minutes = addZero(minutes);
  return ` ${hours}:${minutes}`;
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecastweather");
  let forecast = null;
  forecastElement.innerHTML = "";
  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];

    forecastElement.innerHTML += `
    <div class="row">
    <div class="col-lg-4">
      <ul>          
        <li class="forecast-hour">${formatTime(forecast.dt_txt)}</li>
        <li class="forecast-temp">${Math.round(forecast.main.temp)}°C</p>
      </ul>
    </div>
    <div class="col-lg-4">
    <ul>          
        <img src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" id="icon"  class="icon2"></li>
      </ul>
    </div>
    </div>

  `;
  }
}

let searchLocation = document.querySelector("#location-button");
searchLocation.addEventListener("click", userLocation);

function getTemperature(position) {
  let apiKey = "2a2ce705840d65130b449fa1016ec67f";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${position}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
  url = `https://api.openweathermap.org/data/2.5/forecast/?q=${position}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showForecast);
}

function getTemperatureCurrent(position) {
  let apiKey = "2a2ce705840d65130b449fa1016ec67f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
axios.get(url).then(showLocation);
  url = `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showForecast);
}

function showLocation(response) {
 let userCity = response.data.name;
  let heading = document.querySelector("#maintitle");
 heading.innerHTML = "The weather in " + userCity;
}

