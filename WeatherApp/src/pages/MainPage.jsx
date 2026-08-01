import { useEffect, useState } from "react";

import TodaysWeatherCard from "../components/TodaysWeatherCard.jsx"
import HourlyForecast from "../components/HourlyForecast.jsx"
import SevenDayForecast from "../components/SevenDayForecast.jsx"



export default function MainPage() {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [inputLocationName, setInputLocationName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const DEFAULT_LOCATION = {
    latitude: 37.71639, 
    longitude: -89.208664, 
  }
  // getting forecast api for fetching forecast data & geo api for translating city names into coordinates

  const geoApi = `https://geocoding-api.open-meteo.com/v1/search?name=${inputLocationName}&count=10&language=en&format=json`;

  const handleInputChange = (e) => {
    setInputLocationName(e.target.value);
  };

  
    const fetchCurrentWeatherData = async (latitude, longitude) => {
      try {
        const forecastApi =
     `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,showers_sum,snowfall_sum,precipitation_probability_max&hourly=temperature_2m,rain,snowfall,showers,relative_humidity_2m,visibility&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,is_day,apparent_temperature,precipitation,rain,showers,snowfall,relative_humidity_2m&timezone=GMT&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`;
        const response = await fetch(forecastApi);
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
        }

        setCurrentWeatherData(currentWeather);
        setSearchResults([])
      } catch (e) {
        console.log("Error fetching data: ", e.message);
      }
    };
 
    useEffect(() =>{
fetchCurrentWeatherData(
  DEFAULT_LOCATION.latitude,
  DEFAULT_LOCATION.longitude
)
    }, [])

  useEffect(() => {
    console.log(currentWeatherData)
  }, [currentWeatherData])

  useEffect(() => {
    if (inputLocationName.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const getLocationNames = async () => {
      try {
        const response = await fetch(geoApi);
        const data = await response.json();
        setSearchResults(data.results ?? []);
      } catch (e) {
        console.log("Error fetching data: ", e.message);
      }
    };
    getLocationNames();
  }, [inputLocationName]);


  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-[1.2fr_1.8fr] gap-4 dashboard h-[80vh] w-[92%] bg-background-image text-[var(--text-primary)] rounded-xl p-6">
        <div className="flex flex-col gap-6 h-full text-[var(--text-color)] rounded-md">
            <form action="GET">
              <input
                onChange={handleInputChange}
                type="text"
                className="bg-[var(--background-color)] w-full h-8 px-3 rounded-xl"
                placeholder="Search a city..."
              />
            </form>
            <TodaysWeatherCard currentWeatherData={currentWeatherData}/>
            {searchResults.length > 1 && (
              <div className="absolute bg-[var(--text-primary)] mt-6 rounded-md p-2">
                {searchResults.map((result) => (
                  <p
                  onClick={() => fetchCurrentWeatherData(result.latitude, result.longitude)}
                    key={`${result.latitude} + ${result.longitude}`}
                    className="text-black text-lg py-1 "
                  >
                    {result.name}, {result.admin1}
                  </p>
                ))}
              </div>
            )}  
        </div>
        
          <div>
            <div>
              <HourlyForecast/>
            </div>
            <div>
              <SevenDayForecast/>
            </div>
          </div>
      </div>
    </main>
  );
}
