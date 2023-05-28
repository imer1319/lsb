/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        turquesa: {
          500: '#028FC5',
          700: '#056b94'
        }
      }
    },
  },
  plugins: [],
}