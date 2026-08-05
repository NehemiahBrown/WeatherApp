export const weatherStatus = {
  clear: {
    codes: [0, 1],
    emoji: "☀️",
  },

  cloudy: {
    codes: [2, 3],
    emoji: "☁️",
  },

  fog: {
    codes: [45, 48],
    emoji: "🌫️",
  },

  drizzle: {
    codes: [51, 53, 55, 56, 57],
    emoji: "🌦️",
  },

  rain: {
    codes: [61, 63, 65, 66, 67, 80, 81, 82],
    emoji: "🌧️",
  },

  snow: {
    codes: [71, 73, 75, 77, 85, 86],
    emoji: "❄️",
  },

  thunder: {
    codes: [95, 96, 99],
    emoji: "⛈️",
  },
};

const weatherMessages = {
  clear: [
    "Take a little time to enjoy the sunshine. ☀️",
    "I hope today gives you a reason to smile. ❤️",
    "Hope today is as beautiful as you are. ✨",
  ],

  cloudy: [
    "Be gentle with yourself today. ☁️❤️",
    "Hope today feels calm and peaceful. ☁️✨",
    "A cozy day made for blankets and cuddles. 🫂",
  ],

  fog: [
    "Stay cozy, Dakota. ☕",
    "Take your time today. 🌫️❤️",
    "Hope today feels peaceful. 🌫️✨",
  ],

  drizzle: [
    "There’s a quiet beauty in a gentle drizzle. 🌦️✨",
    "A warm drink sounds nice today. 🌦️☕",
    "Take a moment to slow down today. 🌦️❤️",
  ],

  rain: [
    "Stay dry today, beautiful. 🌧️❤️",
    "Hope home feels extra cozy today. 🏡",
    "Perfect weather for a movie and cuddles. 🎬🍿🫂",
  ],

  snow: [
    "Bundle up and stay warm today. ❄️🧥",
    "Hot chocolate weather has arrived. 🍫☕",
    "Stay warm, Dakota. I love you. ❄️❤️",
  ],

  thunder: [
    "Stay safe and cozy today. ⛈️❤️",
    "The storm will pass. Take care of yourself. 🫂",
    "Perfect weather to stay home and relax. 🏡",
  ],
};

function getWeatherGroup(weatherCode) {
  for (const key in weatherStatus) {
    if (weatherStatus[key].codes.includes(weatherCode)) {
      return key;
    }
  }

  return null;
}

export function getWeatherMessage(weatherCode) {
  const weatherGroup = getWeatherGroup(weatherCode);

  if (!weatherGroup) {
    return "";
  }

  const messages = weatherMessages[weatherGroup];

  if (!messages?.length) {
    return "";
  }

  const randomIndex = Math.floor(Math.random() * messages.length);

  return messages[randomIndex];
}

export function getWeatherEmoji(weatherCode) {
  const weatherGroup = getWeatherGroup(weatherCode);

  if (!weatherGroup) {
    return "🌤️";
  }

  return weatherStatus[weatherGroup].emoji;
}