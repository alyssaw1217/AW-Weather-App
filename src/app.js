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

function displayTemp(response) {
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  let showCity = document.querySelector("#city");
  showCity.innerHTML = response.data.city;
  let skies = document.querySelector("#description");
  skies.innerHTML = response.data.condition.description;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function showForecast(response) {
  let dailyForecast = response.data.daily;
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (days, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `<div class="col-sm-3">
                <div class="forecast-day">${formatDay(days.time)}</div>
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                    days.condition.icon
                  }.png"
                  alt=""
                  width="60"
                />
                <div class="daily-forecast-degrees">
                  <span class="daily-forecast-degrees-max"
                    ><strong>${Math.round(
                      days.temperature.maximum
                    )}°</strong></span
                  >/
                  <span class="daily-forecast-degrees-min">${Math.round(
                    days.temperature.minimum
                  )}°</span>
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "5c0e3b29bb2of0da62d459b3b624c2bt";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showForecast);
}

function searchLocation(city) {
  let apiKey = "5c0e3b29bb2of0da62d459b3b624c2bt";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=5c0e3b29bb2of0da62d459b3b624c2bt&units=imperial`;
  axios.get(apiUrl).then(displayTemp);
}

function submitForm(event) {
  event.preventDefault();
  let locationElement = document.querySelector("#location-input");
  searchLocation(locationElement.value);
}

function showCurrent() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let apiKey = "5c0e3b29bb2of0da62d459b3b624c2bt";
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=5c0e3b29bb2of0da62d459b3b624c2bt&units=imperial`;
  axios.get(apiUrl).then(displayTemp);
}

let apiKey = "5c0e3b29bb2of0da62d459b3b624c2bt";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=London&key=5c0e3b29bb2of0da62d459b3b624c2bt&units=imperial`;
axios.get(apiUrl).then(displayTemp);

let form = document.querySelector("#location-form");
form.addEventListener("submit", submitForm);

let button = document.querySelector("#currentCity");
button.addEventListener("click", showCurrent);
