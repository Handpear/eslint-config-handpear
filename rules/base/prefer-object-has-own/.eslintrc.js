module.exports = {
  rules: {
    /**
     * 使用 Object.hasOwn() 而不是 Object.prototype.hasOwnProperty.call()
     * @reason 新特性兼容性不佳
     */
    "prefer-object-has-own": "off",
  },
};
