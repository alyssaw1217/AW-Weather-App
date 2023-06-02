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
locationForm.addEventListener("submit", locationSearch);

function cityElement(response) {
  let temp = document.querySelector("#temperature");
  let city = document.querySelector("#city");
  let description = document.querySelector("#description");
  let windSpeed = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  temp.innerHTML = Math.round(celsiusTemp);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  showWeather(response.data.coord);
}
function showWeather(position) {
  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let location = document.querySelector("#location-input").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  axios.get(url).then(cityElement);
}

function locationSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#location-input");
  search(cityInput.value);
}
