/// <reference types="../typings/global" />
/// <reference types="../typings/rule" />

import fs from 'node:fs';
import path from 'node:path';
import prettier, { type RequiredOptions } from 'prettier';
import prettierrc from '../.prettierrc.json';
import pkg from '../package.json';

type ConfigName = keyof typeof ruleConfigs;
const rulesDir = '../rules';
const ruleConfigs = {
  base: {
    exampleExtension: 'js',
    domain: '',
    pluginName: '',
  },
  typescript: {
    exampleExtension: 'ts',
    domain: '@typescript-eslint/',
    pluginName: '@typescript-eslint/eslint-plugin',
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
} as const;

/** 写入 eslintrc 中的元信息 */
const getESLintrcMeta = () => {
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
};

/** 获取规则集合列表 */
const getRuleModuleList = (configName: ConfigName) => {
  switch (configName) {
    case 'typescript':
      return Object.entries<Rules.RuleModule>(require(ruleConfigs[configName].pluginName).rules);
    case 'react':
      return Object.entries<Rules.RuleModule>(require(ruleConfigs[configName].pluginName).rules);
    case 'vue':
      return Object.entries<Rules.RuleModule>(require(ruleConfigs[configName].pluginName).rules);

    default:
      return Array.from<[string, Rules.RuleModule]>(require('eslint/use-at-your-own-risk').builtinRules.entries());
  }
};

/** 获取自定义规则列表 */
const getCustomRuleConfigList = (configName: ConfigName) => {
  const ruleModuleList = getRuleModuleList(configName);
  const rulesConfigDirs = fs.readdirSync(path.resolve(__dirname, rulesDir, configName));
  const customRuleConfigList = rulesConfigDirs
    .filter((rule) => fs.lstatSync(path.resolve(__dirname, rulesDir, configName, rule)).isDirectory())
    .map((rule) => getCustomRuleConfig(configName, ruleModuleList, rule));

  return customRuleConfigList;
};

/** 解析单条自定义规则 */
const getCustomRuleConfig = (
  configName: ConfigName,
  ruleModuleList: ReturnType<typeof getRuleModuleList>,
  ruleName: string,
) => {
  const filePath = path.resolve(__dirname, rulesDir, configName, ruleName, '.eslintrc.js');
  const fileModule = require(filePath);
  const fullRuleName = ruleConfigs[configName].domain + ruleName;
  const ruleModule = ruleModuleList.find((ruleset) => ruleset[0] === ruleName)?.[1];
  const rule: Rules.Rule = {
    ...ruleConfigs[configName],
    name: fullRuleName,
    value: fileModule.rules[fullRuleName],
    url: ruleModule?.meta.docs.url || '',
    description: ruleModule?.meta.docs.description || '',
  };

  // 判断继承的基础规则
  if (ruleModule && configName === 'typescript') {
    if ((ruleModule.meta as Rules.Typescript.Meta).docs.extendsBaseRule === true) {
      rule.extendedBaseRule = ruleName;
    }
  }
  // 判断继承的基础规则
  if (ruleModule && configName === 'vue') {
    if ((ruleModule.meta as Rules.Vue.Meta).docs.extensionRule === true) {
      rule.extendedBaseRule = ruleName;
    }
  }

  return rule;
};

/** 解析规则内容 */
const getRuleContent = (configName: ConfigName) => {
  const customRuleConfigList = getCustomRuleConfigList(configName);
  const contentList = customRuleConfigList.map((customRuleConfig) => {
    // 若继承自基础规则，并且是 ts 规则，则需要先关闭基础规则
    const content: string[] = [];
    if (configName === 'typescript' && customRuleConfig.extendedBaseRule) {
      content.push(`'${customRuleConfig.extendedBaseRule}': 'off'`);
    }
    content.push(`'${customRuleConfig.name}': ${JSON.stringify(customRuleConfig.value, null, 4)},`);

    return content.join(',');
  });

  return contentList.join('');
};

/** 格式化写入 */
const resolveFormatWrite = async (filePath: string, content: string, parser = 'babel') => {
  const formatedContent = await prettier.format(content, { ...(prettierrc as Partial<RequiredOptions>), parser });
  fs.writeFileSync(filePath, formatedContent, 'utf-8');
};

/** 获取插件初始配置的内容 */
const getInitialESLintrc = (configName: ConfigName) => {
  const initialEslintrcPath = path.resolve(__dirname, `${rulesDir}/${configName}/.eslintrc.js`);
  if (!fs.existsSync(initialEslintrcPath)) return '';
  return fs.readFileSync(initialEslintrcPath, 'utf-8');
};

/** 构建 eslintrc 文件 */
const buildESLintrc = (configName: ConfigName) => {
  const eslintrcMeta = getESLintrcMeta();
  const initialESLintrc = getInitialESLintrc(configName).replace(/extends:.*],/, '');
  const ruleContent = getRuleContent(configName);
  const content =
    eslintrcMeta +
    initialESLintrc.replace(/(,\s*rules: {([\s\S]*?)})?,\s*};/, (match, p1, p2) => {
      const rules = p2 ? `${p2}${ruleContent}` : ruleContent;
      return `,rules:{ ${rules} } };`;
    });

  resolveFormatWrite(path.resolve(__dirname, `../${configName}.js`), content);
};

Object.keys(ruleConfigs).forEach((configName) => {
  buildESLintrc(configName as ConfigName);
});
