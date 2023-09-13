# React 规则

## React 使用方法

### 安装

::: code-group

```shell [npm]
npm install --save-dev eslint @babel/core @babel/eslint-parser @babel/preset-react@latest eslint-plugin-react eslint-config-handpear
```

```shell [pnpm]
pnpm add --save-dev eslint @babel/core @babel/eslint-parser @babel/preset-react@latest eslint-plugin-react eslint-config-handpear
```

:::

### 配置

在你的项目的根目录下创建一个 `.eslintrc.js` 文件，并将以下内容复制进去：

```js
module.exports = {
  // 按顺序引入
  extends: ['handpear', 'handpear/react'],
};
```

## React Typescript 使用方法

### 安装

::: code-group

```shell [npm]
npm install --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-config-handpear
```

```shell [pnpm]
pnpm add --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-config-handpear
```

:::

### 配置

在你的项目的根目录下创建一个 `.eslintrc.js` 文件，并将以下内容复制进去：

```js
module.exports = {
  // 按顺序引入
  extends: ['handpear', 'handpear/typescript', 'handpear/react'],
  parserOptions: {
    // 你的 tsconfig.json 路径
    project: './tsconfig.json',
  },
};
```
