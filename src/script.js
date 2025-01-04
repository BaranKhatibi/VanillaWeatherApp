function searchHandler(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#form-input-text");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = inputElement.value;
}

let formElement = document.querySelector("#search-form-id");
formElement.addEventListener("submit", searchHandler);
