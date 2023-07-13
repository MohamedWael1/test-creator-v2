/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./features/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "amazing-gradient":
                    "linear-gradient(to right, var(--gradient-1), var(--gradient-7), var(--gradient-8))",
            },
            colors: {
                "primary-text": "var(--primary-text)",
                "secondary-text": "var(--secondary-text)",
                "primary-700": "var(--primary-700)",
                "primary-600": "var(--primary-600)",
                "danger-600": "var(--danger-600)",
                "danger-500": "var(--danger-500)",
            },
        },
    },
    plugins: [],
};
