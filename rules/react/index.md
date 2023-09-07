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
  extends: ['handpear', 'handpear/react'],
  rules: {
    // 自定义你的规则
  },
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
  extends: ['handpear', 'handpear/react', 'handpear/typescript'],
  parserOptions: {
    // 你的 tsconfig.json 路径
    project: './tsconfig.json',
  },
  rules: {
    // 自定义你的规则

    // 如果使用全局命名空间导致报错，则添加以下规则
    'no-undef': ['off'],
  },
};
```
