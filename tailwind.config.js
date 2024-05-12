/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./*.html"],
  theme: {
    colors: {
      background: "#FFFAF0",
      offwhite: "#FFEEDE",
      lightgray: "#484845",
      darkgray: "#1C1C1B",
    },
    fontFamily: {
      poiret: ["Poiret One, sans-serif"],
      montserrat: ["Montserrat, sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
