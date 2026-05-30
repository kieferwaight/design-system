import type { EnvironmentProfile } from "../environment.types";

export const desktopProfile: Omit<
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
    mode: "three-pane",
    density: "expanded",
    sidebar: "persistent",
    list: "persistent",
    content: "persistent",
    inspector: "side-panel",
  },
  navigation: {
    mode: "multi-pane",
    transition: "none",
    backBehavior: "escape-key",
    gestureOwner: "os",
  },
};
