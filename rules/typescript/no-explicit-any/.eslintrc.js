module.exports = {
  rules: {
    /**
     * 禁止使用 any 类型，除了 rest 参数之外
     * @reason 有时需要定义如 `(...args: any[]) => void` 的类型
     */
    '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: true, ignoreRestArgs: true }],
  },
};
