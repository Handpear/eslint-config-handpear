/* eslint-disable @typescript-eslint/no-require-imports */
import pkg from '../package.json';

export const NAMESPACE_CONFIG = {
  base: {
    /** 示例文件后缀 */
    exampleExtension: 'js',
    /** 域 */
    domain: '',
    /** 插件的名称 */
    pluginName: undefined,
  },
  react: {
    exampleExtension: 'js',
    domain: 'react/',
    pluginName: 'eslint-plugin-react',
  },
  vue: {
    exampleExtension: 'vue',
    domain: 'vue/',
    pluginName: 'eslint-plugin-vue',
  },
  typescript: {
    exampleExtension: 'ts',
    domain: '@typescript-eslint/',
    pluginName: '@typescript-eslint/eslint-plugin',
  },
};

export type Namespace = keyof typeof NAMESPACE_CONFIG;
export const NAMESPACES = Object.keys(NAMESPACE_CONFIG) as Namespace[];

/** 写入 eslintrc 中的元信息 */
export function buildEslintrcMeta() {
  return `
/**
 * ${pkg.description}
 * ${pkg.homepage}
 *
 * 依赖版本：
 *   ${[
   'eslint',
   'eslint-plugin-react',
   'eslint-plugin-vue',
   '@babel/core',
   '@babel/eslint-parser',
   '@babel/preset-react',
   'vue-eslint-parser',
   '@typescript-eslint/parser',
   '@typescript-eslint/eslint-plugin',
   'typescript',
 ]
   .map((key) => `${key} ${(pkg.devDependencies as Record<string, string>)[key]}`)
   .join('\n *   ')}
 *
 * 此文件是由脚本 scripts/build.ts 自动生成
 */
`;
}
