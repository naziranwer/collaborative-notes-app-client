/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f3ca25",
        secondary: "#f3b625",
        button: "#e23030",
      },
    },
  },
  plugins: [],
};
