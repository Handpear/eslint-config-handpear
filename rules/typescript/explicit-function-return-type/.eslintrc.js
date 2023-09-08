module.exports = {
  rules: {
    /**
     * 函数返回值必须与声明的类型一致
     */
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],
  },
};
