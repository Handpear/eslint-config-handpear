module.exports = {
  rules: {
    /**
     * 禁止定义空的接口
     * @reason 允许仅继承
     */
    "@typescript-eslint/no-empty-interface": ["error", { allowSingleExtends: true }],
  },
};
