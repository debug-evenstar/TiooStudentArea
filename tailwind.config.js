/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{html,js,ts,tsx}",
    "./node_modules/@Praxeum-ai/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home': "linear-gradient(to right, rgba(105, 76, 87, 1),rgba(0, 0, 0, 0.2))",
        'dash': "url('https://res.cloudinary.com/dic7regoe/image/upload/v1689193391/praxeum/Frame_1000004421_aysm37.png')",
        'frame': "url('https://res.cloudinary.com/dic7regoe/image/upload/v1689405515/praxeum/Frame_1000004193_io2u7f.png')",
        'frame2': "url('https://res.cloudinary.com/dic7regoe/image/upload/v1690134583/praxeum/Frame_1000004498_eke756.png')",
        'compbg': "url('https://res.cloudinary.com/dic7regoe/image/upload/v1691443549/praxeum/Desktop_-_328_1_1_kgqpua.png')",
        'bgcomp': "url('https://res.cloudinary.com/dic7regoe/image/upload/v1691354626/praxeum/Frame_1000004416_iflseu.png')",
        'bgsuccess': "url('https://res.cloudinary.com/dic7regoe/image/upload/v1691484705/praxeum/success_q0ntxg.png')",
        'bgfailure': "url('https://res.cloudinary.com/dic7regoe/image/upload/v1691484705/praxeum/fail_gtdllx.png')",
        'mobilesuccess': "url('https://res.cloudinary.com/dic7regoe/image/upload/v1691568250/praxeum/Group_12599_skzl8n.png')",
      },
    },
  },
  plugins: [],
});