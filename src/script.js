function refreshWeather(response) {
  let tempElement = document.querySelector(".weather-app-degree");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `              <img
                src="${response.data.condition.icon_url}"
                class="weather-app-icon"
                alt="${response.data.condition.icon}"
              />`;

  getForcast(response.data.city);
}

function formatDate(date) {
  let hour = date.getHours();
  let minute = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (minute < 10) {
    minute = `0${minute}`;
  }

  let day = days[date.getDay()];

  return `${day} ${hour}:${minute}`;
}

function searchCity(city) {
  let apiKey = "243tde0baafa0604eoa0cf81b23fedf1";
  // https://api.shecodes.io/weather/v1/current?query={query}&key={key}
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(refreshWeather);
}

function searchHandler(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#form-input-text");

  searchCity(inputElement.value);
}

function getForcast(city) {
  let apiKey = "243tde0baafa0604eoa0cf81b23fedf1";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayForcast);
}

function formatDay(time) {
  let date = new Date(time * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForcast(response) {
  let forcastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index <= 7 && index >= 1) {
      forcastHtml += `         
          <div class="weather-forcast-day">
            <div class="weather-forcast-date">${formatDay(day.time)}</div>
            <img src="${day.condition.icon_url}" class="weather-forcast-icon"/>
            <div class="weather-forcast-temperature">
              <div class="forcast-max"><strong>${Math.round(
                day.temperature.maximum
              )}°</strong></div>
              <div class="forcast-min">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>`;
    }
  });

  let forcastElement = document.querySelector("#forcast");
  forcastElement.innerHTML = forcastHtml;
}

let formElement = document.querySelector("#search-form-id");
formElement.addEventListener("submit", searchHandler);

searchCity("Mashhad");
