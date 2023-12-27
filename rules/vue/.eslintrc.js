module.exports = {
  extends: ["../base/.eslintrc.js"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: {
      js: "@typescript-eslint/parser",
      jsx: "@typescript-eslint/parser",
      ts: "@typescript-eslint/parser",
      tsx: "@typescript-eslint/parser",
      "<template>": "espree",
    },
    sourceType: "module",
    extraFileExtensions: [".vue"],
    ecmaVersion: 2020,
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx: true,
    },
    // 即使没有 babelrc 配置文件，也使用 @babel/eslint-parser 来解析
    requireConfigFile: false,
    // 仅允许 import export 语句出现在模块的顶层
    allowImportExportEverywhere: false,
  },
  plugins: ["vue"],
  settings: {
    react: {
      version: "detect",
    },
  },
};
