function refreshWeather(response) {
  let tempElement = document.querySelector(".weather-app-degree");
  let temperature = response.data.daily["0"].temperature.day;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.daily["0"].time * 1000);
  let iconElement = document.querySelector("#icon");

  console.log(response.data.daily["0"].condition.icon_url);

  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.daily["0"].condition.description;
  humidityElement.innerHTML = `${response.data.daily["0"].temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.daily["0"].wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `              <img
                src="${response.data.daily["0"].condition.icon_url}"
                class="weather-app-icon"
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
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

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
