/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'home': "linear-gradient(to right, rgba(105, 76, 87, 1),rgba(0, 0, 0, 0.2))",
        'dash': "url('https://res.cloudinary.com/dic7regoe/image/upload/v1689193391/praxeum/Frame_1000004421_aysm37.png')",
      },
    },
  },
  plugins: [],
});