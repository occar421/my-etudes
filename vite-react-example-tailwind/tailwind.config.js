const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      theme: { navy: "#282c34", cyan: "#61dafb" },
    },
    fontFamily: {
      sans: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        '"Fira Sans"',
        '"Droid Sans"',
        '"Helvetica Neue"',
      ],
      mono: ["source-code-pro", "Menlo", "Monaco", "Consolas", '"Courier New"'],
    },
  },
  plugins: [],
};
