import { getWeatherDescription } from "../utils/weatherCodes";

export default function TodaysWeatherCard({currentWeatherData}){
    return (
        <div className="flex flex-col flex-1 gap-4 justify-center items-center bg-[var(--card-background)] backdrop-blur-[18px] border border-2 border-[var(--border)] text-[var(--text-color)]">
            <p className="text-6xl">{currentWeatherData?.temperature}&deg;</p>
            <p className="text-4xl">{getWeatherDescription(currentWeatherData?.weather)}</p>
        </div>
    )
}