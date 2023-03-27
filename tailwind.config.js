/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/components/*.tsx",
    "./src/screen//**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        myColor: {
          100: "#F3F4F6",
          200: "#8995F9",
          300: "#E1E8F0",
        },
      },
    },
  },
  plugins: [],
};
