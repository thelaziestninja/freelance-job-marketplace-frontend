/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      backgroundColor: {
        "custom-pink": "#d07ea7",
      },
    },
  },
  variants: {},
  plugins: [],
};
