import { formatDateTime } from "./helper.js";

const header = document.querySelector(".header");
const headerTime = document.querySelector(".time");
const outputForecast = document.querySelector(".output-forecast");
const searchImg = document.querySelector(".search-city");
const tempDescription = document.getElementById("temp-description");
const ariaLive = document.getElementById("confirmation");

// Display and Update time each minute
export function updateTime() {
    const currentTime = formatDateTime(new Date());
    headerTime.innerHTML = `
        ${currentTime.split(" ")[0]}
        <span>${currentTime.split(" ")[1]}</span>
    `;
}

export function displayError(error) {
    searchImg.classList.add("hidden");
    deleteDomElements();

    outputForecast.insertAdjacentHTML(
        "beforeend",
        `<div class="output fade-in">${error}</div>`
    );

    // errors for screen reader
    ariaLive.textContent = error;
}

export function deleteDomElements() {
    const location = document.querySelector(".location");
    if (location) header.removeChild(location);

    const todayForecast = document.querySelector(".today-forecast");
    if (todayForecast) tempDescription.removeChild(todayForecast);

    const output = document.querySelector(".output");
    if (output) outputForecast.removeChild(output);
}

export function toggleSpinner(icon) {
    // Switching between original icon and reload icon while fetching data from API
    icon.classList.toggle("hidden");
    icon.nextElementSibling.classList.toggle("hidden");
}
