import { formatDateTime } from "./helper.js";

const headerTime = document.querySelector(".time");
const outputForecast = document.querySelector(".output-forecast");
const searchImg = document.querySelector(".search-city");
const locationEle = document.querySelector(".location");
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
    const output = document.querySelector(".output");
    if (output) outputForecast.removeChild(output);
    outputForecast.insertAdjacentHTML(
        "beforeend",
        `<div class="output fade-in">${error}</div>`
    );

    searchImg.classList.add("hidden");
    if (locationEle) locationEle.classList.add("hidden");
    if (tempDescription) tempDescription.classList.add("hidden");

    // errors for screen reader
    ariaLive.textContent = error;
}

export function toggleSpinner(icon) {
    // Switching between original icon and reload icon while fetching data from API
    icon.classList.toggle("hidden");
    icon.nextElementSibling.classList.toggle("hidden");
}
