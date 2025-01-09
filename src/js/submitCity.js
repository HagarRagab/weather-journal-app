import { toggleSpinner } from "./domFunctions.js";
import fetchForecastData from "./fetchForecast.js";
import { currentQuery } from "./currentQuery.js";

const cityInput = document.getElementById("city");
const searchIcon = document.querySelector(".search-icon");

export default async function submitCity(e) {
    e.preventDefault();
    toggleSpinner(searchIcon);

    const regex = /\s+/g;
    const cityName = cityInput.value.replaceAll(regex, " ").trim();
    currentQuery.setCityName(cityName);
    currentQuery.setLat(null);
    currentQuery.setLon(null);
    cityInput.value = "";

    await fetchForecastData("cityName");

    toggleSpinner(searchIcon);
}
