module.exports = {
  rules: {
    /**
     * 组件内没有内容时，必须使用自闭和写法
     */
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
  },
};
