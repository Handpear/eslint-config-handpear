module.exports = {
  rules: {
    /**
     * 禁止使用未定义的变量
     * @reason 全局声明中的除外，兼容如 'unplugin-auto-import' 之类的自动导入插件
     */
    "react/jsx-no-undef": ["error", { allowGlobals: true }],
  },
};
