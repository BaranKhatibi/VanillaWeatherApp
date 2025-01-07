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

let formElement = document.querySelector("#search-form-id");
formElement.addEventListener("submit", searchHandler);

searchCity("Paris");
