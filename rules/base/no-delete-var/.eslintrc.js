module.exports = {
  rules: {
    /**
     * 禁止对一个变量使用 delete
     * @reason 编译阶段会报错
     */
    'no-delete-var': 'off',
  },
};
