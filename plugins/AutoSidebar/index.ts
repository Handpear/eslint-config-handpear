import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import type { PluginOption } from 'vite';
import type { DefaultTheme } from 'vitepress';
import { type AutoSidebarOptions, type AutoSidebarUserOptions, resolveOptions } from './options';

export function AutoSidebar(userOptions: AutoSidebarUserOptions = {}): PluginOption {
  const options = resolveOptions(userOptions);

  return {
    name: 'auto-sidebar',
    configureServer: ({ watcher, restart }) => {
      watcher.add(options.extensions.map((e) => `*.${e}`)).on('all', (event) => {
        if (event !== 'change') restart();
      });
    },
    config(config) {
      if (config.vitepress) {
        config.vitepress.site.themeConfig.sidebar = createSideBarGroups(options);
      }

      return config;
    },
  };
}

function createSideBarGroups(options: AutoSidebarOptions): DefaultTheme.SidebarMulti {
  const root = join(process.cwd(), options.root);
  const [data] = createSideBarItems(options, root);

  const sidebar = data.reduce<DefaultTheme.SidebarMulti>((prev, curr) => {
    prev[`/${options.root}/${curr.text}/`] = [{ items: [curr] }];

    return prev;
  }, {});

  return sidebar;
}

function createSideBarItems(
  options: AutoSidebarOptions,
  path: string,
  ...reset: string[]
): [DefaultTheme.SidebarItem[], string[]] {
  const nodeList = readdirSync(join(path, ...reset));
  const result: DefaultTheme.SidebarItem[] = [];

  for (const node of nodeList) {
    if (statSync(join(path, ...reset, node)).isDirectory()) {
      // * directory
      const [items, dirs] = createSideBarItems(options, join(path), ...reset, node);

      if (items.length > 0) {
        const hasIndexFile = options.extensions.some((ext) => dirs.some((d) => `index.${ext}` === d));
        result.push({
          text: node,
          link: hasIndexFile ? '/' + [options.root, ...reset, node, ''].join('/') : '',
          items: items.filter((item) => item.text !== node),
        });
      }
    } else {
      // * file
      const extensions = node.split('.').at(-1);
      if (extensions && options.extensions.includes(extensions)) {
        const name = node.replace(`.${extensions}`, '');
        const item: DefaultTheme.SidebarItem = {
          text: name === 'index' ? reset.at(-1) || options.root : name,
          link: '/' + (reset.length ? [options.root, ...reset, name] : [options.root, name]).join('/'),
        };
        result.push(item);
      }
    }
  }

  return [result, nodeList];
}
