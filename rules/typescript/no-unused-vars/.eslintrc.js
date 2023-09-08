module.exports = {
  rules: {
    /**
     * 已定义的变量必须使用
     */
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: false,
        caughtErrors: 'none',
      },
    ],
  },
};
