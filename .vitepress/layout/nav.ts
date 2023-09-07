import { DefaultTheme } from 'vitepress';

const ruleNames = ['base', 'react', 'vue', 'typescript'];

export const nav: DefaultTheme.NavItem[] = [
  {
    text: '规则',
    items: ruleNames.map((key) => ({ text: key, link: `/rules/${key}/` })),
  },
];
