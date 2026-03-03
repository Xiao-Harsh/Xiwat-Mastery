/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                xiwat: {
                    black: '#111111',
                    white: '#F9F9F9',
                    gold: '#C5A059',
                    gray: '#333333',
                    lightgray: '#E5E5E5',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Playfair Display', 'serif'],
            },
        },
    },
    plugins: [],
}
