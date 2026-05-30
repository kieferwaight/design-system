import type { EnvironmentProfile } from "../environment.types";

export const iosProfile: Omit<
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
    mode: "single-screen-stack",
    density: "compact",
    sidebar: "root-view",
    list: "stack-view",
    content: "stack-view",
    inspector: "sheet",
  },
  navigation: {
    mode: "push-stack",
    transition: "ios-slide",
    backBehavior: "edge-swipe",
    gestureOwner: "os",
  },
};
