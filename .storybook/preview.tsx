import type { Preview } from "@storybook/react-vite";
import { themes } from "storybook/theming";
import "../src/generated/css/theme.css";

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.light,
    },
  },
};

export default preview;
