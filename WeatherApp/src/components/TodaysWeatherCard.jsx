import { getWeatherDescription } from "../utils/weatherCodes";
import { getWeatherMessage } from "../utils/weatherGroups.js"
import { Thermometer } from 'lucide-react';
import { Droplet } from 'lucide-react';
import { Droplets } from 'lucide-react';
import { Wind } from 'lucide-react';


export default function TodaysWeatherCard({currentWeatherData}){
    return (
        <>
        <div className="flex flex-col flex-1 gap-4 py-4 justify-center items-center bg-[var(--card-background)] backdrop-blur-[18px] border border-2 border-[var(--border)] text-[var(--text-color)]">
            <p className="text-6xl">{currentWeatherData?.temperature}&deg;</p>
            <p className="text-4xl">{getWeatherDescription(currentWeatherData?.weather)}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full px-4">
            <div className="w-full py-4 px-2 bg-[var(--subCard-background)] backdrop-blur-[18px] border border-[var(--card-background)] shadow-[0_10px_30px_rgba(0,0,0,0.35)] rounded-md">
                <div className="flex items-center gap-2 text-sm"><Thermometer size={16}/>FEELS LIKE</div>
                <p className="mt-2 text-3xl">{currentWeatherData?.feelsLike}&deg;</p>
                <p>{getWeatherMessage(currentWeatherData?.weather)}</p>
            </div>
            <div className="w-full py-4 px-2 bg-[var(--subCard-background)] backdrop-blur-[18px] border border-[var(--card-background)] shadow-[0_10px_30px_rgba(0,0,0,0.35)] rounded-md">
            <div className="flex items-center gap-2 text-sm"><Droplet size={16}/>PRECIPITATION</div>
                <p className="mt-2 text-5xl">{currentWeatherData?.precipitation}&rdquo;</p>
            </div>
            <div className="w-full py-4 px-2 bg-[var(--subCard-background)] backdrop-blur-[18px] border border-[var(--card-background)] shadow-[0_10px_30px_rgba(0,0,0,0.35)] rounded-md">
            <div className="flex items-center gap-2 text-sm"><Droplets size={16}/>HUMIDITY</div>
            <p className="mt-2 text-5xl">{currentWeatherData?.humidity}&#37;</p>

            </div>
            <div className="w-full py-4 px-2 bg-[var(--subCard-background)] backdrop-blur-[18px] border border-[var(--card-background)] shadow-[0_10px_30px_rgba(0,0,0,0.35)] rounded-md">
            <div className="flex items-center gap-2 text-sm"><Wind size={16}/>WIND SPEED</div>
            <p className="mt-2 text-5xl">{currentWeatherData?.windSpeed}<span className="text-2xl">mph</span></p>
            </div>
        </div>
        </div>
      
        </>
    )
}