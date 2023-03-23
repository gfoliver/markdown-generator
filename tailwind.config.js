/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
        colors: {
            primary: '#5227FF',
            dark: '#0A0A21',
            'dark-lighter': 'rgba(255, 255, 255, 0.1)',
            tint: 'rgba(0, 0, 0, 0.1)',
            text: '#000000',
            'text-dark': '#FFF',
            light: '#F3F3F3',
            lighter: '#FCFCFC'
        }
    },
  },
  plugins: [],
}