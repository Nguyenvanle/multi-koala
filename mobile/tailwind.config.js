// tailwind.config.js

module.exports = {
  content: [
    "./app.{js,jsx,ts,tsx}",
    "./app/(auth).{js,jsx,ts,tsx}",
    "./app/(tabs).{js,jsx,ts,tsx}",
    "./assets/fonts.{js, jsx, ts, tsx}",
    "./app/components.{js,jsx,ts,tsx}",
    "./assets/images.{js, jsx, ts, tsx}",
    "./constants.{js, jsx, ts, tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
