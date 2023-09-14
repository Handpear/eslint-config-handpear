namespace Rules {
  interface Rule {
    /** 域 */
    domain: string;
    /** 插件的名称 */
    pluginName: string;
    /** 单条规则名称 */
    name: RuleName;
    /** 单条规则值 */
    value: any;
    /** 单条规则描述 */
    description: string;
    /** 继承的基础规则 */
    extendedBaseRule?: string;
    /** 文档地址 */
    url: string;

    /** 示例文件后缀 */
    exampleExtension: ExampleExtension;
  }
  interface RuleModule {
    meta: Base.Meta | React.Meta | Vue.Meta | Typescript.Meta;
  }
  namespace Base {
    interface Doc {
      description: string;
      recommended: boolean;
      url: string;
    }
    interface GetWithoutSet {
      type: string;
      default: boolean;
    }
    interface SetWithoutGet {
      type: string;
      default: boolean;
    }
    interface EnforceForClassMember {
      type: string;
      default: boolean;
    }
    interface Property {
      getWithoutSet: GetWithoutSet;
      setWithoutGet: SetWithoutGet;
      enforceForClassMembers: EnforceForClassMember;
    }
    interface Schema {
      type: string;
      properties: Property;
      additionalProperties: boolean;
    }
    interface Message {
      missingGetterInPropertyDescriptor: string;
      missingSetterInPropertyDescriptor: string;
      missingGetterInObjectLiteral: string;
      missingSetterInObjectLiteral: string;
      missingGetterInClass: string;
      missingSetterInClass: string;
    }
    interface Meta {
      type: string;
      docs: Doc;
      schema: Schema[];
      messages: Message;
    }
  }
  namespace React {
    interface Doc {
      category: string;
      description: string;
      recommended: boolean;
      url: string;
    }
    interface Message {
      patternMismatch: string;
    }
    interface Item {
      type: string;
    }
    interface PropTypeName {
      items: Item;
      minItems: number;
      type: string;
      uniqueItems: boolean;
    }
    interface Rule {
      default: string;
      minLength: number;
      type: string;
    }
    interface Message {
      minLength: number;
      type: string;
    }
    interface ValidateNested {
      default: boolean;
      type: string;
    }
    interface Property {
      propTypeNames: PropTypeName;
      rule: Rule;
      message: Message;
      validateNested: ValidateNested;
    }
    interface Schema {
      additionalProperties: boolean;
      properties: Property;
      type: string;
    }
    interface Meta {
      docs: Doc;
      messages: Message;
      schema: Schema[];
    }
  }
  namespace Vue {
    interface Doc {
      description: string;
      recommended: boolean;
      url: string;
      category?: any;
      extensionRule: boolean;
      coreRuleUrl: string;
    }
    interface OneOf {
      enum: string[];
    }
    interface Schema {
      oneOf: OneOf[];
    }
    interface Message {
      unexpectedOpeningLinebreak: string;
      unexpectedClosingLinebreak: string;
      missingOpeningLinebreak: string;
      missingClosingLinebreak: string;
    }
    interface Meta {
      type: string;
      docs: Doc;
      fixable: string;
      schema: Schema[];
      messages: Message;
    }
  }
  namespace Typescript {
    interface Doc {
      extendsBaseRule: boolean;
      description: string;
      recommended: string;
      url: string;
    }
    interface Message {
      adjacentSignature: string;
    }
    interface Meta {
      type: string;
      docs: Doc;
      schema: any[];
      messages: Message;
    }
  }
}
