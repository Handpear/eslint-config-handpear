# 内置规则

## 内置规则 使用方法

### 安装

::: code-group

```shell [npm]
npm install --save-dev eslint @babel/core @babel/eslint-parser eslint-config-handpear
```

```shell [pnpm]
pnpm add --save-dev eslint @babel/core @babel/eslint-parser eslint-config-handpear
```

:::

### 配置

在你的项目的根目录下创建一个 `.eslintrc.js` 文件，并将以下内容复制进去：

```js
module.exports = {
  extends: ['handpear'],
};
```
