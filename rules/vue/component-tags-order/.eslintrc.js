module.exports = {
  rules: {
    /**
     * 组件中必须按照 <script>, <script setup>, <template>, <style>, <style scoped> 排序
     */
    'vue/component-tags-order': [
      'error',
      {
        order: ['script:not([setup])', 'script[setup]', 'template', 'style:not([scoped])', 'style[scoped]'],
      },
    ],
  },
};
