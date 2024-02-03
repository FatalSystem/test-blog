/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        mobilel: "425px",
        mobilem: "375px",
        mobiles: "320px",
        tablet: "450px",
      },
      colors: {
        "t-red": "red",
        "t-blue": "blue",
        "t-yellow": "yellow",
        "t-off-white": "#F6F7F2",
        "t-off-black": "#191A16",
        "t-black": "#202023",
        "t-green": "#C0F20C",
        "t-white": "#E9E5F0",
        "t-light-green": "#ECF0E5",
        "t-video-gradient": "rgb(32, 32, 35, 0.6)",
      },
      fontFamily: {
        avenir: ["Avenir", "sans-serif"],
      },
    },
  },
  plugins: [],
}
