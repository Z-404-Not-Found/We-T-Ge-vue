/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "bg-color": "#ededed",
                "text-gay-color": "#969799",
            },
        },
    },
    plugins: [],
};
