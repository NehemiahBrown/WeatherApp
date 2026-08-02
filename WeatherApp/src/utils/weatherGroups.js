export const weatherStatus =  {
    clear: [0, 1],
    cloudy: [2, 3],
    fog: [45, 48],
    drizzle: [51, 53, 55, 56, 57],
    rain: [61, 63, 65, 66, 67, 80, 81, 82],
    snow: [71, 73, 75, 77, 85, 86],
    thunder: [95, 96, 99],
  };

  const weatherMessages = {
    clear: [
      "Perfect weather to be outside.",
      "Enjoy the sunshine while it lasts.",
      "Clear skies make for a beautiful day.",
    ],
  
    cloudy: [
      "Clouds are keeping temperatures mild.",
      "A pleasant day with plenty of cloud cover.",
      "Comfortable conditions despite the clouds.",
    ],

    fog: [
      "Put your high beams on.", 
      "Fog may affect visibility.",
      "Be careful when you drive."
    ],
  
    rain: [
      "Don't forget your umbrella.",
      "Wet conditions are expected today.",
      "Rain may affect outdoor plans.",
    ],
  
    snow: [
      "Bundle up before heading outside.",
      "Snow could make roads slippery.",
      "Cold conditions call for warm clothing.",
    ],
  
    thunder: [
      "Stay indoors if storms develop.",
      "Lightning is possible today.",
      "Keep an eye on changing conditions.",
    ],
  };

  export function getWeatherMessage(weatherCode){
    for (const key in weatherStatus){
        if(weatherStatus[key].includes(weatherCode)){
          console.log(weatherMessages[key])
           return weatherMessages[key][Math.floor(Math.random() * weatherMessages[key].length)] ?? ""
        }
    }
  }