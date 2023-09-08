# eslint-config-handpear

Handpear ESLint 规则

一套适用于 React/Vue/Typescript 项目的 ESLint 配置规范。

## 基础规则

### 安装

```shell
pnpm add -D eslint @babel/core @babel/eslint-parser eslint-config-handpear
```

### 使用

```js
module.exports = {
  extends: ['handpear'],
};
```

## Typescript

### 安装

```shell
pnpm add --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-handpear
```

```js
module.exports = {
  extends: ['handpear', 'handpear/typescript'],
  parserOptions: {
    // 你的 tsconfig.json 路径
    project: './tsconfig.json',
  },
};
```

### 使用

## React

### 安装

```shell
pnpm add --save-dev eslint @babel/core @babel/eslint-parser @babel/preset-react@latest eslint-plugin-react eslint-config-handpear
```

### 使用

```js
module.exports = {
  extends: ['handpear', 'handpear/react'],
};
```

## React Typescript

### 安装

```shell
pnpm add --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-config-handpear
```

### 使用

```js
module.exports = {
  extends: ['handpear', 'handpear/react', 'handpear/typescript'],
  parserOptions: {
    // 你的 tsconfig.json 路径
    project: './tsconfig.json',
  },
};
```

## Vue

### 安装

```shell
pnpm add --save-dev eslint @babel/core @babel/eslint-parser vue-eslint-parser eslint-plugin-vue eslint-config-handpear
```

### 使用

```js
module.exports = {
  extends: ['handpear', 'handpear/vue'],
};
```

## Vue Typescript

### 安装

```shell
pnpm add --save-dev @babel/core @babel/eslint-parser @typescript-eslint/eslint-plugin @typescript-eslint/parser @vue/eslint-config-typescript eslint eslint-config-handpear eslint-plugin-vue vue-eslint-parser

```

### 使用

```js
module.exports = {
  extends: ['handpear', 'handpear/vue', 'handpear/typescript'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: {
      js: '@babel/eslint-parser',
      jsx: '@babel/eslint-parser',
      ts: '@typescript-eslint/parser',
      tsx: '@typescript-eslint/parser',
    },
    // 你的 tsconfig.json 路径
    project: './tsconfig.json',
  },
};
```

## 相关链接

[eslint-config-alloy](https://alloyteam.github.io/eslint-config-alloy/?language=zh-CN)

## License

[MIT](https://github.com/Handpear/eslint-config-handpear/blob/main/LICENSE)

Copyright (c) 2023-present, Handpear
