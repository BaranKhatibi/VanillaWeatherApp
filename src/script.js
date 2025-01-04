function refreshWeather(response) {
  let tempElement = document.querySelector(".weather-app-degree");
  let temperature = response.data.daily["0"].temperature.day;
  let cityElement = document.querySelector("#city");
  
  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(temperature);
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
