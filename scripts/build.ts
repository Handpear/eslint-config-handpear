/* eslint-disable @typescript-eslint/no-require-imports */
/// <reference types="../typings/global" />

import fs from 'node:fs';
import path from 'node:path';
import doctrine from 'doctrine';
import prettier, { type RequiredOptions } from 'prettier';
import prettierrc from '../.prettierrc.json';
import { buildEslintrcMeta, type Namespace, NAMESPACE_CONFIG, NAMESPACES } from '../config';

// const DEBUT_WHITELIST = ['jsx-curly-brace-presence'];

class Builder {
  private namespace: Namespace = NAMESPACES[0]!;
  /** 插件的 meta 信息 */
  private ruleMetaMap: Record<string, RuleDocs> = {};
  /** 当前 namespace 的规则列表 */
  private ruleList: Rule[] = [];
  /** 当前 namespace 的所有规则合并后的文本，包含注释 */
  private rulesContent = '';
  /** 插件初始配置的内容，如 rules/react/.eslintrc.js */
  private initialEslintrcContent = '';
  /** build base 时，暂存当前 ruleConfig，供后续继承用 */
  private baseRuleConfig: Record<string, Rule> = {};

  public async build(namespace: Namespace) {
    this.namespace = namespace;
    this.ruleMetaMap = this.getRuleMetaMap();
    this.ruleList = await this.getRuleList();
    this.rulesContent = this.getRulesContent();
    this.initialEslintrcContent = this.getInitialEslintrc();
    this.buildEslintrc();
  }

  /** 获取插件的 meta 信息 */
  private getRuleMetaMap() {
    const { domain, pluginName } = NAMESPACE_CONFIG[this.namespace];
    const ruleEntries = pluginName
      ? Object.entries<RuleMeta>(require(pluginName).rules)
      : Array.from<[string, RuleMeta]>(require('eslint/use-at-your-own-risk').builtinRules.entries());

    return ruleEntries.reduce<Record<string, RuleDocs>>((prev, [ruleName, ruleValue]) => {
      const fullRuleName = domain + ruleName;
      const meta = ruleValue.meta;
      prev[fullRuleName] = {
        fixable: meta.fixable === 'code',
        extendsBaseRule:
          // meta.docs.extendsBaseRule 若为 string，则表示继承的规则，若为 true，则提取继承的规则的名称
          meta.docs.extensionRule === true || meta.docs.extendsBaseRule === true
            ? ruleName.replace(NAMESPACE_CONFIG[this.namespace].domain, '')
            : meta.docs.extendsBaseRule || '',
        requiresTypeChecking: meta.docs.requiresTypeChecking ?? false,
      };
      return prev;
    }, {});
  }

  /** 获取规则列表，根据字母排序 */
  private async getRuleList() {
    const ruleList = await Promise.all(
      fs
        .readdirSync(path.resolve(__dirname, '../rules', this.namespace))
        .filter((ruleName) => fs.lstatSync(path.resolve(__dirname, '../rules', this.namespace, ruleName)).isDirectory())
        // .filter((ruleName) => DEBUT_WHITELIST.includes(ruleName))
        .map((ruleName) => this.getRule(ruleName)),
    );

    return ruleList;
  }

  /** 解析单条规则为一个规则对象 */
  private async getRule(ruleName: string) {
    const filePath = path.resolve(__dirname, '../rules', this.namespace, ruleName, '.eslintrc.js');
    const fileModule = require(filePath);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const fullRuleName = NAMESPACE_CONFIG[this.namespace].domain + ruleName;
    const comments = /\/\*\*.*\*\//gms.exec(fileContent);
    const rule: Rule = {
      name: fullRuleName,
      value: fileModule.rules[fullRuleName],
      description: '',
      reason: '',
      domain: NAMESPACE_CONFIG[this.namespace].domain,
      ...(this.ruleMetaMap[fullRuleName] || { fixable: false, extendsBaseRule: '', requiresTypeChecking: false }),
    };
    if (comments !== null) {
      // 通过 doctrine 解析注释
      const commentsAST = doctrine.parse(comments[0], { unwrap: true });
      // 将注释体解析为 description
      rule.description = commentsAST.description;
      // 解析其他的注释内容，如 @reason
      rule.reason = commentsAST.tags.find(({ title }) => title === 'reason')?.description ?? '';
    }
    // 若没有描述，并且有继承的规则，则使用继承的规则的描述
    if (!rule.description && rule.extendsBaseRule) {
      rule.description = this.baseRuleConfig[rule.extendsBaseRule]?.description || '';
    }
    // 若没有原因，并且有继承的规则，并且本规则的配置项与继承的规则的配置项一致，则使用继承的规则的原因
    try {
      if (
        !rule.reason &&
        rule.extendsBaseRule &&
        JSON.stringify(rule.value) === JSON.stringify(this.baseRuleConfig[rule.extendsBaseRule]?.value)
      ) {
        rule.reason = this.baseRuleConfig[rule.extendsBaseRule]?.reason || '';
      }
    } catch (e) {}

    return rule;
  }

  /** 获取插件初始配置的内容 */
  private getInitialEslintrc() {
    const initialEslintrcPath = path.resolve(__dirname, `../rules/${this.namespace}/.eslintrc.js`);
    if (!fs.existsSync(initialEslintrcPath)) {
      return '';
    }
    return fs.readFileSync(initialEslintrcPath, 'utf-8');
  }

  /** 获取当前 namespace 的所有规则合并后的文本，包含注释 */
  private getRulesContent() {
    return this.ruleList
      .map((rule) => {
        let content = ['\n/**', ...rule.description.split('\n').map((line) => ` * ${line}`)];
        if (rule.reason) {
          content = [
            ...content,
            ...rule.reason.split('\n').map((line, index) => (index === 0 ? ` * @reason ${line}` : ` * ${line}`)),
          ];
        }
        content.push(' */');
        // 若继承自基础规则，并且是 ts 规则，则需要先关闭基础规则
        const extendsBaseRule = this.ruleMetaMap[rule.name]?.extendsBaseRule;
        if (extendsBaseRule && this.namespace === 'typescript') {
          content.push(`'${extendsBaseRule}': 'off',`);
        }
        content.push(`'${rule.name}': ${JSON.stringify(rule.value, null, 4)},`);
        return content.join('\n    ');
      })
      .join('');
  }

  /** 写入各插件的 eslintrc 文件 */
  private buildEslintrc() {
    const eslintrcContent =
      buildEslintrcMeta() +
      this.initialEslintrcContent
        // 去掉 extends
        .replace(/extends:.*],/, '')
        // 将 rulesContent 写入 rules
        .replace(/(,\s*rules: {([\s\S]*?)})?,\s*};/, (_match, _p1, p2) => {
          const rules = p2 ? `${p2}${this.rulesContent}` : this.rulesContent;
          return `,rules:{${rules}}};`;
        });

    this.writeWithPrettier(path.resolve(__dirname, `../${this.namespace}.js`), eslintrcContent);
  }

  /** 经过 Prettier 格式化后写入文件 */
  private async writeWithPrettier(filePath: string, content: string, parser = 'babel') {
    const formatedContent = await prettier.format(content, { ...(prettierrc as Partial<RequiredOptions>), parser });
    fs.writeFileSync(filePath, formatedContent, 'utf-8');
  }
}

main();
async function main() {
  const builder = new Builder();
  for (const namespace of NAMESPACES) {
    await builder.build(namespace);
  }
}
