import { getWeatherEmoji } from "../utils/weatherGroups.js";
import {
    Droplet,
    Snowflake
  } from "lucide-react";

export default function SevenDayForecast({dailyWeatherData}){
      if (!dailyWeatherData) {
    return (
      <div className="flex flex-1 items-center justify-center border-2 border-[var(--border)] bg-[var(--card-background)] text-[var(--text-color)] backdrop-blur-[18px]">
        Loading daily forecast...
      </div>
    );
  }

    return (
        <section className="border-2 border-[var(--border)] bg-[var(--card-background)] p-4 text-[var(--text-color)] backdrop-blur-[18px]">
            <h1 className="mb-4 text-2xl">Seven Day Forecast</h1>
            <div className="flex gap-4 overflow-x-auto pb-2">
        {dailyWeatherData.map((day) => {
                const hasRain = day.rainSum > 0;
                const hasSnow = day.snowSum > 0;
            return(
          <div
            key={day.id}
            className="flex flex-col flex-1 justify-center min-w-28 rounded-md border border-[var(--card-background)] bg-[var(--subCard-background)] p-3 text-center"
          >
            <p className="text-sm uppercase">
              {day.time}
            </p>

            <p className="my-2 text-3xl">
              {getWeatherEmoji(day.weather)}
            </p>

            <p className="text-2xl">
              H {Math.round(day.tempMax)}&deg;
            </p>

            <p className="text-2xl">
              L {Math.round(day.tempMin)}&deg;
            </p>

            <p className="mt-2 text-sm">
              {day.precipitationProbability ?? 0}% rain
            </p>

            <p className="flex items-center justify-center gap-2">
            {hasRain && "💧"}
            {hasSnow && "❄️"}

            <span>{day.precipitationSum.toFixed(1)}&rdquo;</span>
</p>
          </div>
)})}
      </div>
        </section>
    )
}