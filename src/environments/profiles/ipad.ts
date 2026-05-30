import type { EnvironmentProfile } from "../environment.types";

export const ipadProfile: Omit<
  EnvironmentProfile,
  | "device"
  | "viewport"
  | "orientation"
  | "launch"
  | "input"
  | "surface"
  | "capabilities"
  | "isResolved"
> = {
  layout: {
    mode: "split-view",
    density: "regular",
    sidebar: "collapsible",
    list: "persistent",
    content: "detail-pane",
    inspector: "sheet",
  },
  navigation: {
    mode: "split-popover",
    transition: "fade-scale",
    backBehavior: "button",
    gestureOwner: "os",
  },
};
