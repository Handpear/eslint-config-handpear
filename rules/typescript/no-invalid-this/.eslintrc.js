module.exports = {
  rules: {
    /**
     * 禁止在类之外的地方使用 this
     * @reason 通常情况下只允许在 class 中使用 this，但某些第三方库需要使用 this 获取上下文
     */
    '@typescript-eslint/no-invalid-this': 'off',
  },
};
