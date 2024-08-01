function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let descriptionElement = document.querySelector("#description");
  let timeElement = document.querySelector("#present-time");
  let date = new Date(response.data.time * 1000);
  let iconELement = document.querySelector("#temperature-icon");
  console.log(response.data);
  iconELement.innerHTML = `<img src= "${response.data.condition.icon_url}" class="current-temperature-icon" />`;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  descriptionElement.innerHTML = `${response.data.condition.description}.`;
  timeElement.innerHTML = formatDate(date);

  fetchForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function searchEngine(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function fetchForecast(city) {
  let apiKey = "f9c18fe9ad39b36a26o47004111c3tcf";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  console.log(response.data);
  let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <img src=${day.condition.icon_url} class="weather-forecast-icon" />
            <div class="weather-forecast-values"> 
            <span class="high-temperature"> <strong>${Math.round(
              day.temperature.maximum
            )}°C</strong></span>
            <span class="low-temperature"> ${Math.round(
              day.temperature.minimum
            )}°C</span></div>
        </div>`;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

function searchCity(city) {
  let apiKey = "f9c18fe9ad39b36a26o47004111c3tcf";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchEngine);
searchCity("Durban");
showForecast();
