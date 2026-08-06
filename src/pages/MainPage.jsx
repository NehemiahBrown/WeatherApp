import { useEffect, useState } from "react";

import TodaysWeatherCard from "../components/TodaysWeatherCard.jsx";
import HourlyForecast from "../components/HourlyForecast.jsx";
import SevenDayForecast from "../components/SevenDayForecast.jsx";
import { MapPin } from "lucide-react";

export default function MainPage() {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState([]);
  const [dailyWeatherData, setDailyWeatherData] = useState([]);
  const [inputLocationName, setInputLocationName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(
    "Carbondale, Illinois",
  );

  const DEFAULT_LOCATION = {
    latitude: 37.71639,
    longitude: -89.208664,
  };

  const geoApi =
    `https://geocoding-api.open-meteo.com/v1/search` +
    `?name=${inputLocationName}` +
    `&count=10` +
    `&language=en` +
    `&format=json`;

  function handleInputChange(event) {
    setInputLocationName(event.target.value);
  }

  async function fetchCurrentWeatherData(latitude, longitude) {
    try {
      const forecastApi =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,is_day,apparent_temperature,precipitation,rain,showers,snowfall` +
        `&timezone=auto` +
        `&wind_speed_unit=mph` +
        `&temperature_unit=fahrenheit` +
        `&precipitation_unit=inch`;

      const response = await fetch(forecastApi);

      if (!response.ok) {
        throw new Error(`Current-weather request failed: ${response.status}`);
      }

      const data = await response.json();

      const currentWeather = {
        temperature: data?.current?.temperature_2m,
        feelsLike: data?.current?.apparent_temperature,
        precipitation: data?.current?.precipitation,
        rain: data?.current?.rain,
        snow: data?.current?.snowfall,
        dayOrNight: data?.current?.is_day,
        windSpeed: data?.current?.wind_speed_10m,
        humidity: data?.current?.relative_humidity_2m,
        weather: data?.current?.weather_code,
      };

      setCurrentWeatherData(currentWeather);
      setSearchResults([]);
    } catch (error) {
      console.log("Error fetching current weather:", error.message);
    }
  }

  async function fetchHourlyData(latitude, longitude) {
    try {
      const forecastApi =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&hourly=temperature_2m,weather_code,relative_humidity_2m,apparent_temperature,rain,snowfall,precipitation,precipitation_probability,snow_depth` +
        `&timezone=auto` +
        `&temperature_unit=fahrenheit` +
        `&precipitation_unit=inch`;

      const response = await fetch(forecastApi);

      if (!response.ok) {
        throw new Error(`Hourly-weather request failed: ${response.status}`);
      }

      const data = await response.json();

      const hourlyWeatherArray = data.hourly.time
        .map((time, index) => {
          const givenTime = new Date(time);

          const timeFormatted = givenTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
          });

          const cleanTime = timeFormatted.replace(/\s+/g, "").toLowerCase();

          return {
            id: time,
            rawTime: time,
            time: cleanTime,
            temperature: data?.hourly?.temperature_2m[index],
            feelsLike: data?.hourly?.apparent_temperature[index],
            rain: data?.hourly?.rain[index],
            snow: data?.hourly?.snowfall[index],
            snowDepth: data?.hourly?.snow_depth[index],
            humidity: data?.hourly?.relative_humidity_2m[index],
            weather: data?.hourly?.weather_code[index],
            precipitation: data?.hourly?.precipitation[index],
            precipitationProbability:
              data?.hourly?.precipitation_probability[index],
          };
        })
        .slice(0, 24);

      setHourlyWeatherData(hourlyWeatherArray);
      setSearchResults([]);
    } catch (error) {
      console.log("Error fetching hourly weather:", error.message);
    }
  }

  async function fetchDailyWeatherData(latitude, longitude) {
    try {
      const forecastApi =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,snowfall_sum,showers_sum,precipitation_hours,precipitation_sum,precipitation_probability_max` +
        `&timezone=auto` +
        `&wind_speed_unit=mph` +
        `&temperature_unit=fahrenheit` +
        `&precipitation_unit=inch`;

      const response = await fetch(forecastApi);

      if (!response.ok) {
        throw new Error(`Current-weather request failed: ${response.status}`);
      }

      const data = await response.json();

      const dailyWeatherArray = data.daily.time.map((day, index) => {
        const dayName = new Date(`${day}T12:00:00`).toLocaleDateString(
          "en-US",
          { weekday: "long" },
        );

        return {
          id: dayName,
          day: dayName,
          tempMax: data?.daily?.temperature_2m_max[index],
          tempMin: data?.daily?.temperature_2m_min[index],
          weather: data?.daily?.weather_code[index],
          precipitationSum: data?.daily?.precipitation_sum[index],
          rainSum: data?.daily?.rain_sum[index],
          snowSum: data?.daily?.snowfall_sum[index],
          showerSum: data?.daily?.showers_sum[index],
          precipitationProbability:
            data?.daily?.precipitation_probability_max[index],
        };
      });
      setDailyWeatherData(dailyWeatherArray);
      setSearchResults([]);
    } catch (error) {
      console.log("Error fetching current weather:", error.message);
    }
  }

  function handleLocationSelection(location) {
    fetchCurrentWeatherData(location.latitude, location.longitude);
    fetchHourlyData(location.latitude, location.longitude);
    fetchDailyWeatherData(location.latitude, location.longitude);

    const locationName = location.admin1
      ? `${location.name}, ${location.admin1}`
      : location.name;

    setCurrentLocation(locationName);
    setInputLocationName("");
  }

  useEffect(() => {
    console.log(dailyWeatherData);
  }, [dailyWeatherData]);

  useEffect(() => {
    fetchCurrentWeatherData(
      DEFAULT_LOCATION.latitude,
      DEFAULT_LOCATION.longitude,
    );

    fetchHourlyData(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude);

    fetchDailyWeatherData(
      DEFAULT_LOCATION.latitude,
      DEFAULT_LOCATION.longitude,
    );
  }, []);

  useEffect(() => {
    if (inputLocationName.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const controller = new AbortController();

    async function getLocationNames() {
      try {
        const response = await fetch(geoApi, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Location request failed: ${response.status}`);
        }

        const data = await response.json();
        setSearchResults(data.results ?? []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log("Error fetching locations:", error.message);
        }
      }
    }

    getLocationNames();

    return () => controller.abort();
  }, [inputLocationName, geoApi]);

  return (
    <main className="flex min-h-screen items-center justify-center py-4 bg-background-image">
      <div className="grid min-h-[80vh] gap-4 rounded-xl bg-background-image py-6 px-4 text-[var(--text-primary)] lg:grid-cols-[1.2fr_1.8fr]">
        <div className="relative min-w-0 flex flex-col h-full gap-6 rounded-md text-[var(--text-color)]">
          <form
            className="relative"
            onSubmit={(event) => event.preventDefault()}
          >
            <MapPin
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={inputLocationName}
              onChange={handleInputChange}
              type="text"
              className="pl-12 h-8 w-full rounded-xl bg-[var(--background-color)] px-3"
              placeholder={currentLocation}
            />
          </form>

          <TodaysWeatherCard currentWeatherData={currentWeatherData} />

          {searchResults.length > 0 && (
            <div className="absolute top-10 z-20 w-full rounded-md bg-[var(--text-primary)] p-2">
              {searchResults.map((result) => (
                <button
                  type="button"
                  onClick={() => handleLocationSelection(result)}
                  key={`${result.latitude}-${result.longitude}`}
                  className="block w-full py-1 text-left text-lg text-black"
                >
                  {result.name}
                  {result.admin1 ? `, ${result.admin1}` : ""}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 min-w-0 lg:mt-14">
          <HourlyForecast hourlyWeatherData={hourlyWeatherData} />
          <SevenDayForecast dailyWeatherData={dailyWeatherData} />
        </div>
      </div>
    </main>
  );
}
