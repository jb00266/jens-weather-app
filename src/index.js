//import "./styles.css";

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
  let myCity = document.querySelector("#input-city");
  let myCityCAPS = capitalizeFirstLetter(myCity.value);
  header1.innerHTML = `The weather in ${myCityCAPS}`;
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
  let temperatureElement2 = document.querySelector("#temperature2");
  let temp2C = temperatureElement2.innerHTML;
  let temp2F = (temp2C * 9) / 5 + 32;
  temperatureElement2.innerHTML = Math.round(temp2F);
  fahrenheitLink.removeEventListener("click", convertToFahrenheit);
  celsiusLink.addEventListener("click", convertToCelsius);
  celsiusLink.style.opacity = "0.5";
  fahrenheitLink.style.color = "white";
  fahrenheitLink.style.opacity = "1";
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
  celsiusLink.style.color = "white";
  celsiusLink.style.opacity = "1";
}

function convertToCelsius2(event) {
  event.preventDefault();
  let temperatureElement2 = document.querySelector("#temperature2");
  let temp2F = temperatureElement2.innerHTML;
  let temp2C = (temp2F - 32) * 0.5556;
  temperatureElement2.innerHTML = Math.round(temp2C);
  celsiusLink2.removeEventListener("click", convertToCelsius2);
  fahrenheitLink2.addEventListener("click", convertToFahrenheit2);
  fahrenheitLink2.style.opacity = "0.5";
  celsiusLink2.style.color = "white";
  celsiusLink2.style.opacity = "1";
}

function convertToFahrenheit2(event) {
  event.preventDefault();
  let temperatureElement2 = document.querySelector("#temperature2");
  let temp2C = temperatureElement2.innerHTML;
  let temp2F = (temp2C * 9) / 5 + 32;
  temperatureElement2.innerHTML = Math.round(temp2F);
  fahrenheitLink2.removeEventListener("click", convertToFahrenheit2);
  celsiusLink2.addEventListener("click", convertToCelsius2);
  celsiusLink2.style.opacity = "0.5";
  fahrenheitLink2.style.color = "white";
  fahrenheitLink2.style.opacity = "1";
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink2 = document.querySelector("#fahrenheit-link2");
fahrenheitLink2.addEventListener("click", convertToFahrenheit2);

let celsiusLink2 = document.querySelector("#celsius-link2");
celsiusLink2.addEventListener("click", convertToCelsius2);

function showWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = temperature;
  fahrenheitLink.style.opacity = "0.5";
}

function userLocation() {
  navigator.geolocation.getCurrentPosition(getTemperatureCurrent);
}

function showCurrentWeather(response) {
  let temperature2Element = document.querySelector("#temperature2");
  let temperature2 = Math.round(response.data.main.temp);
  let userCity = response.data.name;
  temperature2Element.innerHTML = temperature2;
  header2.innerHTML = `${userCity}`;
  fahrenheitLink.style.opacity = "0.5";
}

let searchLocation = document.querySelector("#location-button");
searchLocation.addEventListener("click", userLocation);

function getTemperature(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${position}&appid=${apiKey}&units=metric`;
  console.log(url);
  axios.get(url).then(showWeather);
}

function getTemperatureCurrent(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showCurrentWeather);
}
