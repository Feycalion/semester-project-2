/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./*.html"],
  theme: {
    colors: {
      background: "#FFFAF0",
      backgrounddark: "#232421",
      offwhite: "#FFEEDE",
      lightgray: "#484845",
      darkgray: "#1C1C1B",
      white: "#FFFFFF",
    },
    fontFamily: {
      poiret: ["Poiret One, sans-serif"],
      montserrat: ["Montserrat, sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
