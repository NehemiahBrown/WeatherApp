import { getWeatherEmoji } from "../utils/weatherGroups.js";

export default function HourlyForecast({ hourlyWeatherData = [] }) {
  return (
    <section className="border-2 border-[var(--border)] bg-[var(--card-background)] p-4 text-[var(--text-color)] backdrop-blur-[18px]">
      <h2 className="mb-4 text-2xl">Hourly Forecast</h2>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {hourlyWeatherData.map((hour) => (
          <div
            key={hour.id ?? hour.rawTime}
            className="min-w-24 rounded-md border border-[var(--card-background)] bg-[var(--subCard-background)] p-3 text-center"
          >
            <p className="text-sm uppercase">
              {hour.time}
            </p>

            <p className="my-2 text-3xl">
              {getWeatherEmoji(hour.weather)}
            </p>

            <p className="text-2xl">
              {Math.round(hour.temperature)}&deg;
            </p>

            <p className="mt-2 text-sm">
              {hour.precipitationProbability ?? 0}% rain
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}