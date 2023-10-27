/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      backgroundColor: {
        "custom-pink": "#d07ea7",
        "dark-pink": "#c3598e",
        "custom-coral": "#D07E7E",
        "custom-purple": "#D07ED0",
        "custom-red": "c51b1b",
      },
    },
  },
  variants: {},
  plugins: [],
};
