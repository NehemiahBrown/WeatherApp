import { useEffect, useState } from "react";

import TodaysWeatherCard from "../components/TodaysWeatherCard.jsx"

export default function MainPage() {
  const [currentWeatherData, setCurrentWeatherData] = useState([]);
  const [inputLocationName, setInputLocationName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // getting forecast api for fetching forecast data & geo api for translating city names into coordinates

  const geoApi = `https://geocoding-api.open-meteo.com/v1/search?name=${inputLocationName}&count=10&language=en&format=json`;

  const handleInputChange = (e) => {
    setInputLocationName(e.target.value);
  };

  
    const fetchCurrentWeatherData = async (index) => {
      try {
        const forecastApi =
     `https://api.open-meteo.com/v1/forecast?latitude=${searchResults[index].latitude}&longitude=${searchResults[index].longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,showers_sum,snowfall_sum,precipitation_probability_max&hourly=temperature_2m,rain,snowfall,showers,relative_humidity_2m,visibility&current=temperature_2m,is_day,apparent_temperature,precipitation,rain,showers,snowfall,relative_humidity_2m&timezone=GMT&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`;
        const response = await fetch(forecastApi);
        const data = await response.json();

        const currentWeather = {
            temperature: data?.current?.temperature_2m,
            feelsLike: data?.current?.apparent_temperature,
            precipitation: data?.current?.precipitation,
            rain: data?.current?.rain,
            snow: data?.current?.snowfall,
            dayOrNight: data?.current?.is_day,
        }

        setCurrentWeatherData(currentWeather);
      } catch (e) {
        console.log("Error fetching data: ", e.message);
      }
    };
 

  useEffect(() => {
    console.log(currentWeatherData)
  }, [currentWeatherData])

   function getLocationInformation(index){
    console.log(searchResults[index].latitude)
  }

  useEffect(() => {
    const getLocationNames = async () => {
      try {
        const response = await fetch(geoApi);
        const data = await response.json();
        if (inputLocationName.trim().length < 2) {
          setSearchResults([]);
          return;
        }
        setSearchResults(data.results ?? []);
      } catch (e) {
        console.log("Error fetching data: ", e.message);
      }
    };
    getLocationNames();
  }, [geoApi, inputLocationName]);


  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="dashboard h-[80vh] w-[92%] bg-background-image text-[var(--text-primary)] rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[var(--background-color)] gap-4 p-2 text-[var(--text-color)] rounded-md">
          <h1 className="text-4xl heading-font">Weather Dashboard</h1>
          <div className="flex-1 relative">
            <form action="GET">
              <input
                onChange={handleInputChange}
                type="text"
                className="border w-full h-10 px-3 rounded-xl"
                placeholder="Search a city..."
              />
            </form>
            {searchResults.length > 1 && (
              <div className="absolute bg-[var(--text-primary)] w-full mt-2 rounded-md p-2">
                {searchResults.map((result, index) => (
                  <p
                  onClick={() => fetchCurrentWeatherData(index)}
                    key={result.latitude + result.longitude}
                    className="text-black text-lg py-1 "
                  >
                    {result.name}, {result.admin1}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
        <main className="mt-6">
        <TodaysWeatherCard />
        </main>
      </div>
    </main>
  );
}
