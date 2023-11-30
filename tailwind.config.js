/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Figtree: ["Figtree", "sans-serif"],
      },
      colors: {
        "green-rift": "#079992",
        "green-lime": "#7BED9F",
        "wild-watermelon": "#FF6B81",
        "green-light": "#B8E994",
      },
    },
  },
  plugins: [],
};
