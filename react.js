/**
 * specific rules for ESLint
 * https://github.com/Handpear/eslint-config-handpear.git
 *
 * 依赖版本：
 *   eslint ^8.49.0
 *   eslint-plugin-react ^7.33.2
 *   eslint-plugin-vue ^9.17.0
 *   @babel/core ^7.22.17
 *   @babel/eslint-parser ^7.22.15
 *   @babel/preset-react ^7.22.15
 *   vue-eslint-parser ^9.3.1
 *   @typescript-eslint/parser ^6.7.0
 *   @typescript-eslint/eslint-plugin ^6.7.0
 *   typescript ^5.2.2
 *
 * 此文件是由脚本 scripts/build.ts 自动生成
 */
module.exports = {
  parserOptions: {
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/boolean-prop-naming': 'off',
    'react/button-has-type': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/display-name': 'off',
    'react/forbid-component-props': 'off',
    'react/forbid-dom-props': 'off',
    'react/forbid-elements': 'off',
    'react/forbid-foreign-prop-types': 'off',
    'react/forbid-prop-types': 'off',
    'react/function-component-definition': 'off',
    'react/hook-use-state': 'off',
    'react/iframe-missing-sandbox': 'error',
    'react/jsx-boolean-value': 'off',
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never',
        propElementValues: 'always',
      },
    ],
    'react/jsx-filename-extension': 'off',
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-handler-names': 'off',
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
      },
    ],
    'react/jsx-max-depth': 'off',
    'react/jsx-no-bind': 'off',
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-leaked-render': 'off',
    'react/jsx-no-literals': 'off',
    'react/jsx-no-script-url': 'error',
    'react/jsx-no-target-blank': 'off',
    'react/jsx-no-undef': [
      'error',
      {
        allowGlobals: true,
      },
    ],
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-sort-props': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-access-state-in-setstate': 'off',
    'react/no-adjacent-inline-elements': 'off',
    'react/no-array-index-key': 'off',
    'react/no-arrow-function-lifecycle': 'off',
    'react/no-children-prop': 'off',
    'react/no-danger': 'off',
    'react/no-danger-with-children': 'error',
    'react/no-deprecated': 'error',
    'react/no-did-mount-set-state': 'off',
    'react/no-did-update-set-state': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-invalid-html-attribute': 'off',
    'react/no-is-mounted': 'error',
    'react/no-multi-comp': 'off',
    'react/no-namespace': 'error',
    'react/no-object-type-as-default-prop': 'off',
    'react/no-redundant-should-component-update': 'error',
    'react/no-render-return-value': 'error',
    'react/no-set-state': 'off',
    'react/no-string-refs': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-typos': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unknown-property': 'error',
    'react/no-unsafe': [
      'error',
      {
        checkAliases: true,
      },
    ],
    'react/no-unstable-nested-components': 'error',
    'react/no-unused-class-component-methods': 'off',
    'react/no-unused-prop-types': 'off',
    'react/no-unused-state': 'off',
    'react/no-will-update-set-state': 'off',
    'react/prefer-es6-class': ['error', 'always'],
    'react/prefer-exact-props': 'off',
    'react/prefer-read-only-props': 'off',
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/require-optimization': 'off',
    'react/require-render-return': 'error',
    'react/self-closing-comp': 'error',
    'react/sort-comp': 'error',
    'react/sort-default-props': 'off',
    'react/sort-prop-types': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'error',
    'react/style-prop-object': 'error',
    'react/void-dom-elements-no-children': 'error',
  },
};
