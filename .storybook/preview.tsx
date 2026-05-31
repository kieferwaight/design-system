import type { Preview } from "@storybook/react-vite";
import { themes } from "storybook/theming";

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.light,
    },
  },
};

export default preview;
