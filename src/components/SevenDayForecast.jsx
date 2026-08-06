import { getWeatherEmoji } from "../utils/weatherGroups.js";
import { Droplet, Snowflake } from "lucide-react";

export default function SevenDayForecast({ dailyWeatherData }) {
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
          return (
            <div
              key={day.id}
              className="flex flex-col flex-1 justify-center min-w-28 rounded-md border border-[var(--card-background)] bg-[var(--subCard-background)] p-3 text-center"
            >
              <p>{day.day}</p>
              <p className="text-sm uppercase">{day.time}</p>

              <p className="my-2 text-3xl">{getWeatherEmoji(day.weather)}</p>
              <div className="flex items-end justify-center gap-2">
                <p className="text-3xl font-semibold">
                  {Math.round(day.tempMax)}&deg;
                </p>
                <p className="text-sm text-white/60">
                  {Math.round(day.tempMin)}&deg; low
                </p>
              </div>
              <div className="flex items-center justify-center mt-2 gap-1.5 text-sm text-white/70">
                <p className="flex items-center text-sm">
                  <span>
                    {hasRain && "💧"}
                    {hasSnow && "❄️"}
                  </span>
                  {day.precipitationProbability ?? 0}%
                </p>
                <p className="text-white/40">·</p>
                <p className="flex items-center">
                  <span>{day.precipitationSum.toFixed(1)}in</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
