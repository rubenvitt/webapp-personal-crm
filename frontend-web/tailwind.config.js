const colors = require("tailwindcss/colors");

module.exports = {
  //mode: "jit",
  purge: {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    options: {
      safelist: {
        deep: [/(from|via|to|border|bg|text)-(.*)-(\\d{1}0{1,2})/],
      },
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        gray: colors.trueGray,
        violet: colors.violet,
        yellow: colors.yellow,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
