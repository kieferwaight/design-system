import { DocsContainer } from "@storybook/addon-docs/blocks";
import type { Decorator, Preview } from "@storybook/react-vite";
import { type ComponentProps, useEffect } from "react";
import { CommentWidget } from "./CommentWidget";
import { designKitTheme } from "./theme";
import { applyDeviceAttributes } from "../src/environments/device-detector";
import "../src/generated/css/theme.css";

const withTheme: Decorator = (Story, context) => {
  const { theme, accent } = context.globals;
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") root.removeAttribute("data-theme");
    else root.dataset.theme = theme;
    root.dataset.accent = accent;
  }, [theme, accent]);

  return (
    <div className="bg-bg text-fg min-h-screen">
      <Story />
    </div>
  );
};

/**
 * Mirror the live device type / touch / standalone state onto the canvas root
 * as `data-device` / `data-touch` / `data-standalone`, so device-targeted CSS
 * works inside the catalog (resize via the Viewport toolbar to see it change).
 */
const withDevice: Decorator = (Story) => {
  useEffect(() => applyDeviceAttributes(), []);
  return <Story />;
};

/** Floating "leave a comment" widget on every story canvas → POST /__comments. */
const withComments: Decorator = (Story, context) => {
  const fallbackPage = context.title ? `${context.title} / ${context.name}` : context.id;
  return (
    <>
      <Story />
      <CommentWidget storyId={context.id} fallbackPage={fallbackPage} />
    </>
  );
};

/**
 * Docs pages render through the DocsContainer, not the story decorators, so the
 * comment widget is injected here too. The page ref is the docs id from the
 * preview-iframe URL (falling back to a story title when one is attached).
 */
const DocsContainerWithComments = ({
  context,
  children,
}: ComponentProps<typeof DocsContainer>) => {
  const id = new URLSearchParams(window.location.search).get("id") ?? "docs";
  let page = id;
  try {
    const story = context.storyById();
    if (story?.title) page = story.title;
  } catch {
    // standalone MDX (no attached story) — keep the docs id as the reference
  }
  return (
    // A custom container must forward the theme itself — the `docs.theme`
    // parameter is only auto-applied to the default DocsContainer.
    <DocsContainer context={context} theme={designKitTheme}>
      {children}
      <CommentWidget storyId={id} fallbackPage={page} />
    </DocsContainer>
  );
};

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    backgrounds: { disabled: true },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    docs: { container: DocsContainerWithComments, theme: designKitTheme },
    options: {
      storySort: {
        order: [
          "Overview",
          "Foundations",
          [
            "Overview",
            "Color",
            ["Overview", "Color Token", "Swatch", "Palette", "Collections", "Systems"],
            "Typography",
            "Dimensions",
            "Device",
            "Icons",
          ],
          "Components",
          "Layouts",
          "Views",
          "Platforms",
          "Lab",
          "Dependencies",
          "Archive",
          "*",
        ],
      },
    },
    // iOS logical (point) viewport sizes for PWA testing — full-screen
    // standalone dimensions. Physical pixel resolutions intentionally NOT used.
    viewport: {
      options: {
        // --- iPhone — modern taller aspect ratios (notch / Dynamic Island) ---
        iphone17ProMax: {
          name: 'iPhone Pro Max 6.9" (440)',
          styles: { width: "440px", height: "956px" },
          type: "mobile",
        },
        iphone16Plus: {
          name: 'iPhone Plus / Max 6.7" (430)',
          styles: { width: "430px", height: "932px" },
          type: "mobile",
        },
        iphoneAir: {
          name: 'iPhone Air 6.5" (420)',
          styles: { width: "420px", height: "912px" },
          type: "mobile",
        },
        iphone17Pro: {
          name: 'iPhone Pro 6.3" (402)',
          styles: { width: "402px", height: "874px" },
          type: "mobile",
        },
        iphone16: {
          name: 'iPhone Standard 6.1" (393)',
          styles: { width: "393px", height: "852px" },
          type: "mobile",
        },
        iphone14: {
          name: 'iPhone 6.1" Legacy (390)',
          styles: { width: "390px", height: "844px" },
          type: "mobile",
        },
        iphone11: {
          name: 'iPhone Plus Legacy 6.5" (414)',
          styles: { width: "414px", height: "896px" },
          type: "mobile",
        },
        iphoneMini: {
          name: "iPhone Mini / X (375)",
          styles: { width: "375px", height: "812px" },
          type: "mobile",
        },
        // --- iPhone — classic 16:9 (home button) ---
        iphoneSE: {
          name: "iPhone SE Gen 2/3 (375)",
          styles: { width: "375px", height: "667px" },
          type: "mobile",
        },
        iphone8Plus: {
          name: "iPhone 8/7/6 Plus (414)",
          styles: { width: "414px", height: "736px" },
          type: "mobile",
        },
        // --- iPad (portrait; rotate from the toolbar for landscape) ---
        ipadPro13: {
          name: 'iPad Pro 13" (1032)',
          styles: { width: "1032px", height: "1376px" },
          type: "tablet",
        },
        ipadPro129: {
          name: 'iPad Air 13" / Pro 12.9" (1024)',
          styles: { width: "1024px", height: "1366px" },
          type: "tablet",
        },
        ipadPro11: {
          name: 'iPad Pro 11" (834)',
          styles: { width: "834px", height: "1210px" },
          type: "tablet",
        },
        ipadAir11: {
          name: 'iPad Air 11" / iPad 10th–11th (820)',
          styles: { width: "820px", height: "1180px" },
          type: "tablet",
        },
        ipadPro105: {
          name: 'iPad Pro 10.5" / Air 3 (834)',
          styles: { width: "834px", height: "1112px" },
          type: "tablet",
        },
        ipadMini: {
          name: "iPad Mini 6/7 (744)",
          styles: { width: "744px", height: "1133px" },
          type: "tablet",
        },
        // --- Desktop ---
        desktop: {
          name: "Desktop (1280)",
          styles: { width: "1280px", height: "900px" },
          type: "desktop",
        },
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Color theme",
      // Default the canvas to dark so it sits cohesively inside the dark
      // Macchiato Storybook chrome. Toggle to System/Light from the toolbar.
      defaultValue: "dark",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "system", title: "System" },
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
    accent: {
      description: "Accent seed",
      defaultValue: "blue",
      toolbar: {
        title: "Accent",
        icon: "paintbrush",
        items: [
          { value: "blue", title: "Blue" },
          { value: "indigo", title: "Indigo" },
          { value: "purple", title: "Purple" },
          { value: "pink", title: "Pink" },
          { value: "red", title: "Red" },
          { value: "orange", title: "Orange" },
          { value: "green", title: "Green" },
          { value: "teal", title: "Teal" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme, withDevice, withComments],
};

export default preview;
