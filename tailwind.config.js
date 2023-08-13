/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,}"],
  darkMode: "class",
  theme: {
    colors: {
      green: "#15803d",
      lightGreen: "#bbf7d0",
      yellow: "#ca8a04",
      lightYellow: "#fef08a",
      red: "#dc2626",
      lightRed: "#fecaca",
      blue: "#2563eb",
      lightBlue: "#bfdbfe",
      lightGray: "#e5e7eb",
    },
    extend: {},
    fontFamily: {
      sans: ["Poppins", "Arial"],
      serif: [],
    },
  },
  plugins: [],
};
