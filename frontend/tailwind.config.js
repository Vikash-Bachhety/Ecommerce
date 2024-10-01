/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2A9D8F',  // Teal Green
        secondary: '#264653', // Deep Blue-Gray
        accent: '#E76F51',    // Coral Red
        neutral: '#F0F3F5',   // Light Gray
        highlight: '#F4A261', // Sandy Orange
        golden: '#E9C46A',    // Golden Yellow
      },
    },
  },
  plugins: [],
}
