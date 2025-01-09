import { M_SEC } from "./js/config.js";
import { updateTime } from "./js/domFunctions.js";
import submitCity from "./js/submitCity.js";
import { toggleMeasurementUnits } from "./js/measurementUnit.js";
import getGeoLocation from "./js/geoLocation.js";

const headerDate = document.querySelector(".date");
const entry = document.getElementById("entry");
const generateBtn = document.getElementById("generate");
const getLocationBtn = document.getElementById("geo-location");
const toggleBtn = document.getElementById("toggle-unit");

function init() {
    // Update time each 1 minute
    updateTime();
    setInterval(updateTime, M_SEC);

    // Display date
    headerDate.textContent = new Date().toDateString();

    // Submit city name
    entry.addEventListener("submit", submitCity);
    generateBtn.addEventListener("click", submitCity);

    // Get user's current location
    getLocationBtn.addEventListener("click", getGeoLocation);

    // Toggle measurement units
    toggleBtn.addEventListener("click", toggleMeasurementUnits);
}

init();
