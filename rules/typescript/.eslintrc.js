module.exports = {
  extends: ["../base/.eslintrc.js"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "no-undef": "off",
    "react/sort-comp": "off",
  },
};
