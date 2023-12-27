# Vue 规则

## Vue 使用方法

### 安装

::: code-group

```shell [npm]
npm install --save-dev eslint @babel/core @babel/eslint-parser vue-eslint-parser eslint-plugin-vue eslint-config-handpear
```

```shell [pnpm]
pnpm add --save-dev eslint @babel/core @babel/eslint-parser vue-eslint-parser eslint-plugin-vue eslint-config-handpear
```

:::

### 配置

在你的项目的根目录下创建一个 `.eslintrc.js` 文件，并将以下内容复制进去：

```js
module.exports = {
  // 按顺序引入
  extends: ["handpear", "handpear/vue"],
};
```

## Vue Typescript 使用方法

### 安装

::: code-group

```shell [npm]
npm install --save-dev @babel/core @babel/eslint-parser @typescript-eslint/eslint-plugin @typescript-eslint/parser @vue/eslint-config-typescript eslint eslint-config-handpear eslint-plugin-vue vue-eslint-parser
```

```shell [pnpm]
pnpm add --save-dev @babel/core @babel/eslint-parser @typescript-eslint/eslint-plugin @typescript-eslint/parser @vue/eslint-config-typescript eslint eslint-config-handpear eslint-plugin-vue vue-eslint-parser
```

:::

### 配置

在你的项目的根目录下创建一个 `.eslintrc.js` 文件，并将以下内容复制进去：

```js
module.exports = {
  // 按顺序引入
  extends: ["handpear", "handpear/typescript", "handpear/vue"],
  parserOptions: {
    // 你的 tsconfig.json 路径
    project: "./tsconfig.json",
  },
};
```
