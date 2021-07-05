// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

// eslint-disable-next-line no-undef
module.exports = {
  purge: {
    safelist: [
      ...["text", "bg"]
        .map((a) => {
          return ["red", "orange", "green", "gray", "yellow", "primary"].map(
            (b) => {
              return [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                (c) => {
                  return a + "-" + b + "-" + c;
                }
              );
            }
          );
        })
        .flat()
        .flat(),
    ],
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
