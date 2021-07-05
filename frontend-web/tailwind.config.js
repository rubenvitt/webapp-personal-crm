// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

// eslint-disable-next-line no-undef
module.exports = {
  purge: {
    safelist: {
      deep: [
        /red/,
        /orange/,
        /green/,
        /gray/,
        /yellow/,
        /primary/,
        /(from|via|to|border|bg|text)-(.*)-(\\d0{1,2})/,
      ],
    },
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.orange,
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
