
let map;




window.initMap = function() {

    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    map = new google.maps.Map(document.getElementById("map"), {
  
      zoom: 10,
      center: {
        lat: 29.749907,
        lng: -95.358
      },
  
    });
  
    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer);
    document.getElementById("mode").addEventListener("change", () => {
  
      calculateAndDisplayRoute(directionsService, directionsRenderer)
    });
  }
  
  
  
  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    let status;
    const selectedMode = document.getElementById("mode").value;
  
  
    directionsService.route({


        origin: document.getElementById("from").value,

        
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode[selectedMode], //ERROR HERE
      })
  
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Direction request failed due to " + status));
  }

window.initMap = initMap;
// [END maps_map_simple]

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