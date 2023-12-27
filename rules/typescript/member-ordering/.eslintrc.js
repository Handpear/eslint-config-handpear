module.exports = {
  rules: {
    /**
     * 一致的成员声明顺序
     * @reason 优先级：
     * 1. static > constructor > instance
     * 2. field > method
     * 3. public > protected > private
     */
    "@typescript-eslint/member-ordering": [
      "error",
      {
        default: [
          "signature",
          "call-signature",

          "public-static-get",
          "public-static-set",
          "protected-static-get",
          "protected-static-set",
          "private-static-get",
          "private-static-set",
          "#private-static-get",
          "#private-static-set",

          "static-get",
          "static-set",

          "public-static-field",
          "protected-static-field",
          "private-static-field",
          "#private-static-field",
          "static-field",

          "public-static-method",
          "protected-static-method",
          "private-static-method",
          "#private-static-method",
          "static-method",

          "static-initialization",

          "public-constructor",
          "protected-constructor",
          "private-constructor",
          "constructor",

          "public-decorated-get",
          "public-decorated-set",
          "protected-decorated-get",
          "protected-decorated-set",
          "private-decorated-get",
          "private-decorated-set",

          "public-instance-get",
          "public-instance-set",
          "protected-instance-get",
          "protected-instance-set",
          "private-instance-get",
          "private-instance-set",
          "#private-instance-get",
          "#private-instance-set",

          "public-abstract-get",
          "public-abstract-set",
          "protected-abstract-get",
          "protected-abstract-set",

          "public-get",
          "public-set",
          "protected-get",
          "protected-set",
          "private-get",
          "private-set",
          "#private-get",
          "#private-set",

          "instance-get",
          "instance-set",
          "abstract-get",
          "abstract-set",

          "decorated-get",
          "decorated-set",

          "get",
          "set",

          "public-instance-field",
          "protected-instance-field",
          "private-instance-field",
          "#private-instance-field",
          "instance-field",

          "public-field",
          "protected-field",
          "private-field",
          "#private-field",
          "field",

          "public-instance-method",
          "protected-instance-method",
          "private-instance-method",
          "#private-instance-method",
          "instance-method",

          "public-method",
          "protected-method",
          "private-method",
          "#private-method",
          "method",
        ],
      },
    ],
  },
};
