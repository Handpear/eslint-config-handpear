module.exports = {
  rules: {
    /**
     * 禁止使用 0 开头的数字表示八进制数
     * @reason 编译阶段会报错
     */
    "no-octal": "off",
  },
};
