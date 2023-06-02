let today = new Date();

let todaysDateTime = document.querySelector("#dateTime");

let currentDay = today.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDay = days[currentDay];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentMonth = months[today.getMonth()];
let currentDate = today.getDate();

let currentHour = today.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = today.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

todaysDateTime.innerHTML = `${weekDay}, ${currentMonth} ${currentDate} ${currentHour}:${currentMinute}`;

let locationForm = document.querySelector("#location-form");
locationForm.addEventListener("submit", cityElement);

function cityElement(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#location-input");

  let location = document.querySelector("h1");
  location.innerHTML = `<strong>${cityInput.value}</strong>`;
}
navigator.geolocation.getCurrentPosition(showWeather);

function showWeather(position) {
  let apiKey = "5c0e3b29bb2of0da62d459b3b624c2bt";
  let city = document.querySelector("#location-input").value;
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(currentTemp);
}

function currentTemp(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temperatureResult = document.querySelector("#currentDegree");
  temperatureResult.innerHTML = `<strong>${temperature}°</strong>`;
}

let form = document.querySelector("#location-form");
form.addEventListener("submit", showWeather);

function showCityTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#currentDegree");
  cityTemp.innerHTML = `<strong>${temperature}°</strong>`;
  let city = document.querySelector("h1");
  city.innerHTML = `<strong>${response.data.name}<strong>`;
}
function currentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let apiKey = "5c0e3b29bb2of0da62d459b3b624c2bt";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${key}&units=metric`;
  axios.get(url).then(showCityTemp);
}

let button = document.querySelector("#currentCity");
button.addEventListener("click", currentLocation);
