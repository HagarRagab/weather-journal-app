import { displayError, toggleSpinner } from "./domFunctions.js";
import fetchForecastData from "./fetchForecast.js";
import { currentQuery } from "./currentQuery.js";

const locationIcon = document.querySelector(".location-icon");

export default function getGeoLocation() {
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            currentQuery.setLat(position.coords.latitude);
            currentQuery.setLon(position.coords.longitude);
            currentQuery.setCityName("");

            toggleSpinner(locationIcon);
            await fetchForecastData("coords");
            toggleSpinner(locationIcon);
        },
        (error) => {
            // console.log(error);
            // Incase geolocation is not supported in older browsers
            const errorMsg = error
                ? "Cannot get your location information. Please enable your location."
                : "GeoLocation is not supported";
            displayError(errorMsg);
        }
    );
}
