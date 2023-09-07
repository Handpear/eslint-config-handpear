module.exports = {
  rules: {
    /**
     * 禁止重复定义变量
     * @reason 禁用 var 之后，编译阶段会报错
     */
    'no-redeclare': 'off',
  },
};
