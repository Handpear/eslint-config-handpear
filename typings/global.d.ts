/** 索引类型 */
declare type Key = string | number | symbol;
/** 索引对象类型 */
declare type Recordable<K extends Key = Key, T = unknown> = Record<K, T>;

/** 规则文档信息 */
declare interface RuleDocs {
  fixable: boolean;
  extendsBaseRule: string;
  requiresTypeChecking: boolean;
}
/** 规则信息对象 */
interface Rule extends RuleDocs {
  name: string;
  value: unknown;
  description: string;
  reason: string;
  domain: string;
}
/** 规则元信息对象 */
declare interface RuleMeta {
  meta: {
    type: string;
    docs: { extensionRule?: boolean; extendsBaseRule?: boolean; requiresTypeChecking?: boolean; description?: string };
    messages: Recordable;
    schema: unknown[];
    fixable?: string;
    deprecated?: unknown;
  };
  defaultOptions?: Recordable[];
}
