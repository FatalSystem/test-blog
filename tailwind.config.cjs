/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        mobilel: "425px",
        mobilem: "375px",
        mobiles: "320px",
      },
      colors: {
        "t-red": 'red',
        "t-blue": 'blue',
        "t-green": 'green',
        "t-yellow": 'yellow',
        "t-black": "#202023",
        "t-white": "#E9E5F0",
        "t-light-green": "#ECF0E5",
      },
      fontFamily: {
        avenir: ["Avenir", "sans-serif"],
      },
    },
  },
  plugins: [],
}
