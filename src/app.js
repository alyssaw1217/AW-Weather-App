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
  console.log(response.data);
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
}
let apiKey = "5c0e3b29bb2of0da62d459b3b624c2bt";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=tokyo&key=5c0e3b29bb2of0da62d459b3b624c2bt&units=imperial`;

axios.get(apiUrl).then(displayTemp);
