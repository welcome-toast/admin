/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "screen/90": "90vh",
      },
      width: {
        "screen/90": "90vw",
      },
    },
  },
  plugins: [],
};
