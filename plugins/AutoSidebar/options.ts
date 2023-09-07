import type { SiteConfig } from 'vitepress';

declare module 'vite' {
  interface UserConfig {
    vitepress?: SiteConfig;
  }
}

export interface AutoSidebarOptions {
  root: string;
  dirs: string[];
  exclude: string[];
  extensions: string[];
  caseSensitive: boolean;
}

export interface AutoSidebarUserOptions extends Partial<AutoSidebarOptions> {}

const defaultOptions: AutoSidebarOptions = {
  root: '/docs',
  dirs: [],
  exclude: ['scripts', 'components', 'assets', '.vitepress'],
  extensions: ['md'],
  caseSensitive: false,
};

export function resolveOptions(userOptions: AutoSidebarUserOptions): AutoSidebarOptions {
  const options = { ...defaultOptions, ...userOptions };
  options.root = resolveOptionsRoot(options.root);
  options.extensions = resolveOptionsExtensions(options.extensions);

  return options;
}

function resolveOptionsRoot(root: string): string {
  let newRoot = root;
  const [a, ...b] = root;

  if (b.at(-1) === '/' || b.at(-1) === '\\') b.pop();
  if (a === '/' || a === '\\') {
    newRoot = b.join('');
  } else {
    newRoot = [a, ...b].join('');
  }

  return newRoot;
}

function resolveOptionsExtensions(extensions: string[]): string[] {
  const newExtensions = extensions.reduce<string[]>((prev, curr) => {
    if (curr === '*') {
      return prev;
    }

    if (curr.startsWith('*')) {
      const [, b, ...c] = curr;
      if (b === '.') return [c.join(''), ...prev];
    }

    if (curr.startsWith('.')) {
      const [, ...b] = curr;
      return [b.join(''), ...prev];
    }

    return [curr, ...prev];
  }, []);

  return [...new Set(newExtensions)];
}
