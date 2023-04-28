/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      // ...
    },
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
