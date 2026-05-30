import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// We deliberately do NOT merge the whole vite.config.ts: Storybook's
// react-vite framework already supplies the React/JSX plugin, and adding a
// second @vitejs/plugin-react makes React's module identity unstable inside
// the browser tests (the preview decorator's `useEffect` resolves to null).
// Instead we bring in just the pieces the test build needs — the `@/*` alias
// and the Tailwind plugin — so stories resolve and style exactly as in dev.
export default defineConfig({
  plugins: [tailwindcss()],
  resolve: { alias: { "@": path.resolve(dirname, "./src") } },
  // Pre-bundle the libraries the stories pull in so Vite doesn't discover them
  // mid-run and re-optimize — that reload tears down the test collection and
  // surfaces as "Vitest failed to find the current suite" on the heavier files.
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "react-aria-components",
      "lucide-react",
      "clsx",
      "culori",
      "framer-motion",
      "@tanstack/react-virtual",
      "@use-gesture/react",
      "@catppuccin/palette",
      "@rose-pine/palette",
    ],
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [storybookTest({ configDir: path.join(dirname, ".storybook") })],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            provider: playwright({}),
            headless: true,
            instances: [{ browser: "chromium" }],
          },
        },
      },
      {
        test: {
          name: "unit",
          environment: "node",
          include: ["src/**/*.test.ts"],
        },
      },
    ],
  },
});
