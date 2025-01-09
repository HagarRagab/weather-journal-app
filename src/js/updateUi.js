import { measurementSymbols } from "./measurementUnit.js";
import { deleteDomElements } from "./domFunctions.js";

const header = document.querySelector(".header");
const tempDescription = document.getElementById("temp-description");
const outputForecast = document.querySelector(".output-forecast");
const searchImg = document.querySelector(".search-city");

const generateMarkupOutput = (data, tempUnitSymbol) => {
    const nextDaysForecast = data.weeklyForecast.map((forecast) => {
        return `
            <div class="next">
                <div class="label">${forecast.date}</div>
                <div class="icon">
                    <img src='http://openweathermap.org/img/wn/${forecast.icon}.png' alt=${forecast.description} />
                </div>
                <div class="degree">${forecast.temperature}&deg; <span>${tempUnitSymbol}</span></div>
            </div>
        `;
    });

    const markup = `
        <div class="output fade-in">
            <div class="today">
                <div class="icon">
                    <img src='http://openweathermap.org/img/wn/${
                        data.todayWeather.icon
                    }.png' alt="" />
                </div>
                <div class="label">Today</div>
                <div class="degree">${
                    data.todayWeather.temperature
                }&deg; <span>${tempUnitSymbol}</span></div>
            </div>
            ${nextDaysForecast.join("")}
        </div>
    `;

    return markup;
};

const generateMarkupDescription = function (
    data,
    tempUnitSymbol,
    windSpeedUnitSymbol
) {
    return `
        <div class="today-forecast fade-in">
            <div class="icon">
                <img src='http://openweathermap.org/img/wn/${data.todayWeather.icon}.png' alt="${data.todayWeather.description}" />
            </div>
            <div class="today">
                <div class="degree">${data.todayWeather.temperature}&deg; <span>${tempUnitSymbol}</span></div>
                <p class="condition">${data.todayWeather.description}</p>
            </div>
            <div class="humidity">
                <svg>
                    <use href="./img/icons.svg#humidity"></use>
                </svg>
                <div>
                    <p>Humidity</p>
                    <p>${data.todayWeather.humidity}%</p>
                </div>
            </div>
            <div class="wind">
                <svg>
                    <use href="./img/icons.svg#wind"></use>
                </svg>
                <div>
                    <p>Wind speed</p>
                    <p>${data.todayWeather.wind} ${windSpeedUnitSymbol}</p>
                </div>
            </div>
        </div>
    `;
};

const generateMarkupLocation = (city, country) => {
    return `
        <div class="location fade-in">
            <p class="city">${city}</p>
            <p class="country">${country}</p>
            <svg>
                <use href="./img/icons.svg#location"></use>
            </svg>
        </div>
    `;
};

export default async function updateUi(data) {
    const { tempUnitSymbol, windSpeedUnitSymbol } = measurementSymbols();
    searchImg.classList.add("hidden");
    deleteDomElements();

    header.insertAdjacentHTML(
        "beforeend",
        generateMarkupLocation(data.city, data.country)
    );

    tempDescription.insertAdjacentHTML(
        "beforeend",
        generateMarkupDescription(data, tempUnitSymbol, windSpeedUnitSymbol)
    );

    outputForecast.insertAdjacentHTML(
        "beforeend",
        generateMarkupOutput(data, tempUnitSymbol)
    );
}
