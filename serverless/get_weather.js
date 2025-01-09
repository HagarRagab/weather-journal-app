import { API_URL } from "../src/js/config";
// import fetch from "node-fetch";

const { WEATHER_API_KEY } = process.env;

// defining serverless function
export async function handler(event, context) {
    const params = event.body && JSON.parse(event.body);
    const { cityName, lat, lon, searchBy, measurementUnit } = params;

    const query =
        searchBy === "cityName" ? `?q=${cityName}` : `?lat=${lat}&lon=${lon}`;

    if (!WEATHER_API_KEY)
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Missing API key",
            }),
        };
    const url = `${API_URL}${query}&appid=${WEATHER_API_KEY}&units=${measurementUnit}`;

    try {
        const weatherStream = await fetch(url);
        const weatherJson = await weatherStream.json();
        return {
            statusCode: 200,
            body: JSON.stringify(weatherJson),
        };
    } catch (error) {
        return {
            statusCode: 422,
            body: error.stack,
        };
    }
}
