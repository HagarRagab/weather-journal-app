import fetchForecastData from "./fetchForecast.js";
import { toggleSpinner } from "./domFunctions.js";
import { currentQuery } from "./currentQuery.js";

const toggleIcon = document.querySelector(".toggle-icon");

export function getDefaultMeasurementUnit() {
    const locale = navigator.language;
    const userCountry = locale.split("-")[1];
    const fahrenheitRegions = ["US", "BS", "BZ", "KY", "PW"]; // Regions using fahrenheit

    const preferredUnit = fahrenheitRegions.includes(userCountry)
        ? "imperial"
        : "metric";

    return preferredUnit;
}

export async function toggleMeasurementUnits() {
    const measurementUnit = currentQuery.getMeasurementUnit();
    currentQuery.setMeasurementUnit(
        measurementUnit === "imperial" ? "metric" : "imperial"
    );

    const searchBy = currentQuery.getCityName()
        ? "cityName"
        : currentQuery.getLat() && currentQuery.getLon()
        ? "coords"
        : "";

    toggleSpinner(toggleIcon);
    await fetchForecastData(searchBy);
    toggleSpinner(toggleIcon);
}

// User's preferred unit for temperature celsius / fahrenheit
export function measurementSymbols() {
    const measurementUnit = currentQuery.getMeasurementUnit();
    const tempUnitSymbol = measurementUnit === "imperial" ? "F" : "C";
    const windSpeedUnitSymbol = measurementUnit === "imperial" ? "mi/h" : "m/s";

    return { tempUnitSymbol, windSpeedUnitSymbol };
}
