let now = new Date();

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getUTCMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let cardDayDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let cardDayDay = cardDayDays[now.getDay()];
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let month = months[now.getMonth()];

let todayDateTime = document.querySelector(".todayDate");
todayDateTime.innerHTML = `${day} ${hours}:${minutes}`;

let icons = [""];

function showWeather(response) {
  console.log(response);
  let cityTemp = Math.round(response.data.main.temp);
  let realFeel = Math.round(response.data.main.feels_like);
  let cityWeatherDescription = response.data.weather[0].description;
  let currentIcon = response.data.weather[0].icon;
  console.log(currentIcon);

  celsiusTemp = response.data.main.temp;

  let currentWeather = document.querySelector("#todayTempDegrees");
  currentWeather.innerHTML = `${cityTemp}`;
  let currentRealFeel = document.querySelector("#todayRealFeel");
  currentRealFeel.innerHTML = `${realFeel}º`;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${cityWeatherDescription}`;

  let weatherIcon = document.querySelector("#todayIcon");
  weatherIcon.setAttribute("alt", `${currentDescription}`);
  weatherIcon.setAttribute("src", `icons/${currentIcon}.svg`);
}

function citySearch(event) {
  event.preventDefault();
  let userCity = document.querySelector("#city-search");
  userCity.value = userCity.value.trim();
  let apiKey = "9e6ef1596fa5a9f1d6f904d8583ac0a9";
  let units = "metric";
  let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity.value}&appid=${apiKey}&units=${units}`;

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${userCity.value}`;
  axios.get(`${apiWeatherUrl}`).then(showWeather);
}

let citySearchForm = document.querySelector(".search");
citySearchForm.addEventListener("submit", citySearch);

function showLocalWeather(response) {
  console.log(response);
  let currentTemperature = Math.round(response.data.main.temp);
  let realFeel = Math.round(response.data.main.feels_like);
  let currentLocation = response.data.name;
  let cityWeatherDescription = response.data.weather[0].description;
  let windSpeed = Math.round(response.data.wind.speed);
  let currentIcon = response.data.weather[0].icon;

  celsiusTemp = response.data.main.temp;

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentLocation}`;
  let currentWeatherLocal = document.querySelector("#todayTempDegrees");
  currentWeatherLocal.innerHTML = `${currentTemperature}`;
  let currentRealFeel = document.querySelector("#todayRealFeel");
  currentRealFeel.innerHTML = `${realFeel}`;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${cityWeatherDescription}`;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `${windSpeed}`;

  let weatherIcon = document.querySelector("#todayIcon");
  weatherIcon.setAttribute("alt", `${currentDescription}`);
  weatherIcon.setAttribute("src", `icons/${currentIcon}.svg`);
}

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "9e6ef1596fa5a9f1d6f904d8583ac0a9";
  let unit = "metric";
  let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(`${apiWeatherUrl}`).then(showLocalWeather);
}

//let currentButton = document.querySelector("#search-button");
//currentButton.addEventListener(
// "click",
navigator.geolocation.getCurrentPosition(currentLocation);
//);

function changeToFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#todayTempDegrees");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(fahrenheitTemp);

  let degreesCClass = document.querySelector("#celsius");
  degreesCClass.classList.replace("able", "unable");
  let degreesFClass = document.querySelector("#fahrenheit");
  degreesFClass.classList.replace("unable", "able");
}

function changeToCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#todayTempDegrees");
  currentTemp.innerHTML = Math.round(celsiusTemp);

  let degreesFClass = document.querySelector("#fahrenheit");
  degreesFClass.classList.replace("able", "unable");
  let degreesCClass = document.querySelector("#celsius");
  degreesCClass.classList.replace("unable", "able");
}

let fahrenheitDegrees = document.querySelector("#fahrenheit");
fahrenheitDegrees.addEventListener("click", changeToFahrenheit);

let celsiusDegrees = document.querySelector("#celsius");
celsiusDegrees.addEventListener("click", changeToCelsius);

let celsiusTemp = null;
