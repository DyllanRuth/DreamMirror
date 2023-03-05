





let weather = {
    apiKey: "a9130706bd4d4cb57ea1c2f5678cac71",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },

    
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = Math.ceil((temp * 1.8) + 32) + " °F";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

/**
 * @param {Date} date
 */
function formatTime(date) {
  const hours12 = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const isAm = date.getHours() < 12;

  return `${hours12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${isAm ? "AM" : "PM"}`;
}

/**
 * @param {Date} date
 */
function formatDate(date) {
  const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const MONTHS = [
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
    "December"
  ];

  return `${DAYS[date.getDay()]}, ${
    MONTHS[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`;
}

setInterval(() => {
  const now = new Date();

  timeElement.textContent = formatTime(now);
  dateElement.textContent = formatDate(now);
}, 200);
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Houston");

  /* Nagivation JS*/

const nav = document.querySelector("nav");
const toggleBtn = document.querySelector(".toggle-btn");

toggleBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.addEventListener("mousedown", () => {
  nav.addEventListener("mousemove", onDrag);
});

function onDrag({ movementY }) {
  /* this will get all styles of nav */
  const navStyle = window.getComputedStyle(nav);

  /* here getting top of nav and converting it into string */
  const navTop = parseInt(navStyle.top);
  /* here getting height of nav and converting it into string */
  const navHeight = parseInt(navStyle.height);

  /* getting window innerheight */
  const windowHeight = window.innerHeight;

  /* logic to make btn draggable */
  nav.style.top = navTop > 0 ? `${navTop + movementY}px` : "1px";
  if (navTop > windowHeight - navHeight) {
    nav.style.top = `${windowHeight - navHeight}px`;
  }
}

nav.addEventListener("mouseup", () => {
  nav.removeEventListener("mousemove", onDrag);
});

nav.addEventListener("mouseleave", () => {
  nav.removeEventListener("mousemove", onDrag);
});
