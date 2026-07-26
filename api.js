// ================================
// API Base URLs
// ================================

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

// ================================
// Get Coordinates by City
// ================================

export async function getCoordinates(city) {

    const url = new URL(GEO_URL);

    url.search = new URLSearchParams({

        name: city,

        count: 1,

        language: "en",

        format: "json"

    });

    const response = await fetch(url);

    if (!response.ok) {

        throw new Error("Unable to find city.");

    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {

        throw new Error("City not found.");

    }

    return data.results[0];

}

// ================================
// Get Weather
// ================================

export async function getWeather(latitude, longitude) {

    const url = new URL(WEATHER_URL);

    url.search = new URLSearchParams({

        latitude,

        longitude,

        current: "temperature_2m,wind_speed_10m,weather_code",

        daily: "temperature_2m_max,temperature_2m_min",

        forecast_days: 3

    });

    const response = await fetch(url);

    if (!response.ok) {

        throw new Error("Weather request failed.");

    }

    return await response.json();

}