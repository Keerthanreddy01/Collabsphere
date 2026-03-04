/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                background: '#0d0d0d',
                surface: '#1c1c1c',
                primary: '#ffffff',
                secondary: '#7d8590',
                accent: '#1a73e8',
            },
        },
    },
    plugins: [],
}
