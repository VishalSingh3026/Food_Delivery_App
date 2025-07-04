/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                exo: ['"Exo 2"', 'sans-serif'],
                poppins: ['"Poppins"', 'sans-serif'],
                sourGummy: ['"Sour Gummy"', 'cursive'],
                spaceMono: ['"Space Mono"', 'monospace'],
            },
            fontSize: {
                'dynamic': 'clamp(22px, 4.5vw, 4.5vw)', // Using `clamp` to mimic `max`
            },
        },
    },
    plugins: [],
}