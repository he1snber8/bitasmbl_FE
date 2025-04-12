const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // meow: ["Roboto", "sans-serif"],
        mona: ["Mona Sans", "sans-serif"],
      },
      colors: {
        primary: "#000000",
        secondary: "#0f0f0f",
        raisin: "#37006C",
        plum: "#2A0053",
        grape: "#5800EF",
        coal: "#18161B",
        ash: "#cac6bf",
        concrete: "#565653",
        cream: "#FFFDEE",
        resin: "151515",
      },
    },
  },

  plugins: [],
});
