/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            'blue-700': 'hsl(209, 23%, 22%)',
            'blue-800': 'hsl(207, 26%, 17%)',
            'blue-900': 'hsl(200, 15%, 8%)',
            'gray-700': 'hsl(0, 0%, 52%)',
            'gray-100': 'hsl(0, 0%, 98%)',
            'white': 'hsl(0, 0%, 100%)'
        },
        extend: {
          fontFamily: {
            'sans': ['Nunito Sans', ...defaultTheme.fontFamily.sans],
          },
        },
    },
    plugins: [],
}

