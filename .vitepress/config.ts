import { defineConfig } from "vitepress";
import { AutoSidebar } from "../plugins/AutoSidebar";
import { footer } from "./layout/footer";
import { nav } from "./layout/nav";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ESLint Rules",
  description: "Handpear ESLint",
  head: [["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    footer,
    nav,
    socialLinks: [{ icon: "github", link: "https://github.com/Handpear/eslint-config-handpear" }],
    docFooter: { prev: "上一页", next: "下一页" },
    lastUpdatedText: "更新日期",
    outlineTitle: "目录",
  },
  srcExclude: ["**/README.md"],
  vite: {
    server: { host: true },
    css: { devSourcemap: true },
    plugins: [AutoSidebar({ root: "/rules" })],
  },
});
