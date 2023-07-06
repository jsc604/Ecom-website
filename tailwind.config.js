/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      minHeight: {
        '80vh': '80vh',
      },
      height: {
        '70vh': '70vh',
      },
      boxShadow: {
        'button': '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
      },
      colors: {
        'info-dark': '#0288d1',
      },
      screens: {
        'ml': '900px',
      },
    },
  },
  plugins: [],
}
