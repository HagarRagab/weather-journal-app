import { getRegionNameFromCode, formatDateTime } from "./helper.js";
import updateUi from "./updateUi.js";
import { displayError } from "./domFunctions.js";
import { currentQuery } from "./currentQuery.js";

export default async function fetchForecastData(searchBy = "") {
    try {
        const urlDataObj = {
            cityName: currentQuery.getCityName(),
            lat: currentQuery.getLat(),
            lon: currentQuery.getLon(),
            measurementUnit: currentQuery.getMeasurementUnit(),
            searchBy,
        };

        if ((searchBy === "cityName" && !urlDataObj.cityName) || !searchBy)
            throw new Error("Please enter valid city name");

        if (searchBy === "coords" && (!urlDataObj.lat || !urlDataObj.lon))
            throw new Error("Cannot get your location");

        // send url object to serverless function
        const weatherRes = await fetch("/.netlify/functions/get_weather", {
            method: "POST",
            body: JSON.stringify(urlDataObj),
        });
        if (!weatherRes.ok) throw new Error("Cannot get weather information.");
        const data = await weatherRes.json();
        if (data.cod === "404") throw new Error(data.message);

        const weeklyForecast = data.list
            .filter((forecast) => forecast.dt_txt.includes("12:00:00"))
            .map((dailyWeather) => {
                return {
                    temperature: Math.round(dailyWeather.main.temp),
                    date: formatDateTime(new Date(dailyWeather.dt_txt), false),
                    icon: dailyWeather.weather[0].icon,
                    humidity: dailyWeather.main.humidity,
                    description: dailyWeather.weather[0].main,
                    wind: dailyWeather.wind.speed,
                };
            });

        const dataToSend = {
            todayWeather: weeklyForecast[0],
            weeklyForecast: weeklyForecast.slice(1),
            city: data.city.name,
            countryCode: data.city.country,
            country: getRegionNameFromCode(data.city.country),
        };

        updateUi(dataToSend);
    } catch (err) {
        // console.error(err);
        displayError(err.message);
    }
}
