/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brandBlack: '#000000',
        brandPink: '#ff4f87',
        brandRed: '#d61f45',
        brandGray: '#808080',
        brandLight: '#f5f5f5',
      },
    },
  },
  plugins: [],
};