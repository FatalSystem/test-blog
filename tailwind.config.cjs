/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,css}'],
  theme: {
    extend: {
      screens: {
        mobilel: '425px',
        mobilem: '375px',
        mobiles: '320px',
        tablet: '450px',
        desktopxl: '1920px',
        desktopl: '1440px'
      },
      colors: {
        't-red': 'red',
        't-blue': 'blue',
        't-yellow': 'yellow',
        't-off-white': '#F6F7F2',
        't-off-black': '#191A16',
        't-black': '#202023',
        't-green': '#C0F20C',
        't-white': '#E9E5F0',
        't-light-green': '#ECF0E5',
        't-video-gradient': 'rgb(32, 32, 35, 0.6)',
        't-shade': '#232320',
        't-gray': '#AFAFAE'
      },
      fontFamily: {
        avenir: ['AvenirNLPRegular', 'sans-serif'],
        avenirBold: ['AvenirNLPBold', 'sans-serif'],
        pluto: ['PlutoSansRegular', 'sans-serif'],
        plutoLight: ['PlutoSansLight', 'sans-serif'],
        plutoThin: ['PlutoSansThin', 'sans-serif'],
        plutoBold: ['PlutoSansBold', 'sans-serif']
      },
      animation: {
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-50% - var(--gap)/2))' }
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-50% - var(--gap)/2))' }
        }
      }
    },
    plugins: []
  }
}
