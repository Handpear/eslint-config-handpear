module.exports = {
  rules: {
    /**
     * 禁止对没有 then 方法的对象使用 await
     * @reason 有时有助于保持视觉一致性
     */
    "@typescript-eslint/await-thenable": "off",
  },
};
