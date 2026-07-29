import { useEffect, useState } from "react";

export default function MainPage() {
  const [weatherData, setWeatherData] = useState([]);
  const [inputLocationName, setInputLocationName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // getting forecast api for fetching forecast data & geo api for translating city names into coordinates
  const forecastApi =
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,is_day&hourly=temperature_2m,precipitation_probability,weather_code,visibility,uv_index,sunshine_duration,rain,precipitation&timezone=auto";
  const geoApi = `https://geocoding-api.open-meteo.com/v1/search?name=${inputLocationName}&count=10&language=en&format=json`;

  const handleInputChange = (e) => {
    setInputLocationName(e.target.value);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(forecastApi);
        const data = await response.json();

        setWeatherData(data);
      } catch (e) {
        console.log("Error fetching data: ", e.message);
      }
    };
    fetchWeatherData();
  }, []);

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
      <div className="dashboard h-[80vh] w-[92%] bg-background-image text-[var(--text-primary)] rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between m-6 gap-4 ">
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
                {searchResults.map((result) => (
                  <p
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
      </div>
    </main>
  );
}
