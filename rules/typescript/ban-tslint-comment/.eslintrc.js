module.exports = {
  rules: {
    /**
     * 禁止使用类似 tslint:disable-next-line 这样的注释
     * @reason 这种注释本身就是对特殊代码的说明
     */
    '@typescript-eslint/ban-tslint-comment': 'off',
  },
};
