import type { StorybookConfig } from "@storybook/react-vite";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  addons: [{
    name: "@storybook/addon-docs",
    // Enable GFM so Markdown tables (and strikethrough, task lists) render in MDX.
    options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } },
  }, "@storybook/addon-mcp", "@storybook/addon-vitest"],
  // Storybook's manager server has its own host check (separate from Vite's),
  // so the Tailscale-proxied hostname must be allowed here too.
  core: { allowedHosts: [".ts.net"] },
  async viteFinal(config) {
    // Accept the Tailscale-proxied host (tailscale serve terminates TLS and
    // proxies https://dev.tailb19d9.ts.net:6006 → http://127.0.0.1:6006).
    config.server ??= {};
    config.server.allowedHosts = [".ts.net"];
    return config;
  },
};

export default config;
