/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gloomy: {
          background: '#1a1a1a', // Dark background
          text: '#9e9e9e', // Grayish text
          accent: '#444444', // Slightly lighter gray
          userBubble: '#2c2c2c', // Darker bubble for user
          botBubble: '#3c3c3c', // Slightly lighter bubble for bot
        },
      },
      fontFamily: {
        gloomy: ['"Courier New"', 'monospace'], // Monospaced for a somber look
      },
    },
  },
  plugins: [],
};
