/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  prefix: "tw-",
  theme: {
    extend: {
      colors: {
        first: "#003135",
        second: "#024950",
        third: "#964734",
        four: "#0FA4AF",
        five: "#AFDDE5",
        heading: "#24355a",
        newbg: "#f7f8f8",
        footer: "#9f9a9a",
        pinkRed: "#f8395a",
      },
    },
  },
  plugins: [],
};
