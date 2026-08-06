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
    "Take some time to enjoy the sunshine. ☀️",
    "The sun is competing  with your smile ❤️☀️",
    "Hope today is as beautiful as you are. ❤️",
  ],

  cloudy: [
    "Be kind to yourself today. ☁️❤️",
    "Cloudy days are still good days. Take care of yourself. ☁️❤️",
    "A cozy day made for blankets and coffee. ☕",
  ],

  fog: [
    "Stay cozy, baby ☕",
    "Take a deep breath. 🌫️❤️",
    "I hope today feels peaceful. 🌫️✨",
  ],

  drizzle: [
    "There’s a quiet beauty in a gentle drizzle. 🌦️✨",
    "Take a deep breath and enjoy the calm today. 🌦️💙",
    "Take a moment to slow down today. 🌦️❤️",
  ],

  rain: [
    "Stay dry today, beautiful. 🌧️❤️",
    "Hope home feels extra peaceful today. 🏡",
    "Perfect weather for a movie and cuddling. 🎬🍿",
  ],

  snow: [
    "Bundle up and stay warm today. ❄️🧥",
    "Need a warm body? I'm here ❄️👨🏿‍❤️‍👩🏻",
    "Stay warm, baby. I love you. ❄️❤️",
  ],

  thunder: [
    "Stay safe and cozy today. ⛈️❤️",
    "The storm will pass. Take care of yourself. ⛈️❤️",
    "Try to stay inside today love. 🏡",
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
