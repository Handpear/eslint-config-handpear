module.exports = {
  rules: {
    /**
     * 避免错误的使用 Promise
     */
    "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false, properties: false } }],
  },
};
