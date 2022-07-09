let now = new Date();

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getUTCMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

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

function addDateForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let cardDate = date.getDate();
  let cardMonths = [
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
  let cardMonth = cardMonths[date.getMonth()];

  return `${cardDate}/${cardMonth}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `     <div class="col-2">
            <div class="dayCard"> 
               <span id="dayMonthForCard">${addDateForecast(
                 forecastDay.dt
               )}</span>
               <br />
                <span class="dateCard">
									${formatDay(forecastDay.dt)} </span>
              <img src="icons/forecast/${
                forecastDay.weather[0].icon
              }.svg" class="cardIcon"></img>
              <span class="dayTemp"> ${Math.round(forecastDay.temp.max)}º</span>
              <br />
              <span class="nightTemp"> ${Math.round(
                forecastDay.temp.min
              )}º</span>
              </span>
              </div>
              </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showWeather(response) {
  console.log(response);
  let cityTemp = Math.round(response.data.main.temp);
  let realFeel = Math.round(response.data.main.feels_like);
  let cityWeatherDescription = response.data.weather[0].description;
  let currentIcon = response.data.weather[0].icon;
  let cityName = response.data.name;

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityName}`;

  celsiusTemp = response.data.main.temp;

  let currentWeather = document.querySelector("#todayTempDegrees");
  currentWeather.innerHTML = `${cityTemp}`;
  let currentRealFeel = document.querySelector("#todayRealFeel");
  currentRealFeel.innerHTML = `${realFeel}`;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${cityWeatherDescription}`;

  let weatherIcon = document.querySelector("#todayIcon");
  weatherIcon.setAttribute("alt", `${currentDescription}`);
  weatherIcon.setAttribute("src", `icons/${currentIcon}.svg`);

  getForecast(response.data.coord);
}

function citySearch(event) {
  event.preventDefault();
  let userCity = document.querySelector("#city-search");
  userCity.value = userCity.value.trim();
  let apiKey = "9e6ef1596fa5a9f1d6f904d8583ac0a9";
  let units = "metric";
  let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity.value}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiWeatherUrl}`).then(showWeather);
}

let citySearchForm = document.querySelector(".search");
citySearchForm.addEventListener("submit", citySearch);

function getForecast(coordinates) {
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;

  let apiKey = "9e6ef1596fa5a9f1d6f904d8583ac0a9";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayForecast);
}

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

  getForecast(response.data.coord);
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
