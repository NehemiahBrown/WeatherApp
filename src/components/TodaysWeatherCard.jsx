import { useMemo } from "react";
import {
  Thermometer,
  Droplet,
  Droplets,
  Wind,
} from "lucide-react";

import { getWeatherDescription } from "../utils/weatherCodes.js";
import { getWeatherMessage } from "../utils/weatherGroups.js";

export default function TodaysWeatherCard({ currentWeatherData }) {
  const weatherMessage = useMemo(() => {
    return getWeatherMessage(currentWeatherData?.weather);
  }, [currentWeatherData?.weather]);

  if (!currentWeatherData) {
    return (
      <div className="flex flex-1 items-center justify-center border-2 border-[var(--border)] bg-[var(--card-background)] text-[var(--text-color)] backdrop-blur-[18px]">
        Loading weather...
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 border-2 border-[var(--border)] bg-[var(--card-background)] py-4 text-[var(--text-color)] backdrop-blur-[18px]">
      <div className="flex flex-col items-center justify-center px-2">
        <p className="text-6xl">
          {currentWeatherData.temperature}&deg;
        </p>

        <p className="mb-2 mt-10 text-4xl">
          {getWeatherDescription(currentWeatherData.weather)}
        </p>

        <p className="text-center text-xl">
          {weatherMessage}
        </p>
      </div>

      <div className="grid w-full max-w-[750px] mx-auto grid-cols-1 gap-6 px-4 small:grid-cols-2 medium:grid-cols-1 large:grid-cols-2">
        <div className="w-full rounded-md border border-[var(--card-background)] bg-[var(--subCard-background)] px-2 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-[18px]">
          <div className="flex items-center gap-2 text-sm">
            <Thermometer size={16} />
            FEELS LIKE
          </div>

          <p className="mt-2 text-5xl">
            {currentWeatherData.feelsLike}&deg;
          </p>
        </div>

        <div className="w-full rounded-md border border-[var(--card-background)] bg-[var(--subCard-background)] px-2 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-[18px]">
          <div className="flex items-center gap-2 text-sm">
            <Droplet size={16} />
            PRECIPITATION
          </div>

          <p className="mt-2 text-5xl">
            {currentWeatherData.precipitation}&rdquo;
          </p>
        </div>

        <div className="w-full rounded-md border border-[var(--card-background)] bg-[var(--subCard-background)] px-2 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-[18px]">
          <div className="flex items-center gap-2 text-sm">
            <Droplets size={16} />
            HUMIDITY
          </div>

          <p className="mt-2 text-5xl">
            {currentWeatherData.humidity}&#37;
          </p>
        </div>

        <div className="w-full rounded-md border border-[var(--card-background)] bg-[var(--subCard-background)] px-2 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-[18px]">
          <div className="flex items-center gap-2 text-sm">
            <Wind size={16} />
            WIND SPEED
          </div>

          <p className="mt-2 text-5xl">
            {currentWeatherData.windSpeed}
            <span className="text-2xl"> mph</span>
          </p>
        </div>
      </div>
    </div>
  );
}