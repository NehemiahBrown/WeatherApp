export const weatherDescriptions = {
    0: "Clear Sky",

    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Cloudy Skies",

    45: "Fog",
    48: "Freezing Fog",

    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Heavy Drizzle",

    56: "Light Freezing Drizzle",
    57: "Heavy Freezing Drizzle",

    61: "Light Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",

    66: "Light Freezing Rain",
    67: "Heavy Freezing Rain",

    71: "Light Snowfall",
    73: "Moderate Snowfall",
    75: "Heavy Snowfall",

    77: "Snow Grains",

    80: "Light Rain Showers",
    81: "Moderate Rain Showers",
    82: "Heavy Rain Showers",

    85: "Light Snow Showers",
    86: "Heavy Snow Showers",

    95: "Thunderstorm",
    96: "Thunderstorm With Light Hail",
    99: "Thunderstorm With Heavy Hail",
};

export function getWeatherDescription(code){
    return weatherDescriptions[code] ?? "Unknown Weather";
}