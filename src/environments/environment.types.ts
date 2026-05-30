import type { DeviceType, DisplayMode, LaunchMode, ViewportClass } from "@/foundations/device";

export type Orientation = "portrait" | "landscape";
export type InputPrimary = "touch" | "hybrid" | "keyboard-pointer";
export type LayoutMode = "single-screen-stack" | "split-view" | "three-pane";
export type Density = "compact" | "regular" | "expanded";
export type SidebarMode = "root-view" | "collapsible" | "persistent";
export type PaneMode = "stack-view" | "detail-pane" | "persistent";
export type InspectorMode = "hidden" | "sheet" | "side-panel";
export type NavigationMode = "push-stack" | "split-popover" | "multi-pane";
export type Transition = "ios-slide" | "fade-scale" | "none";
export type BackBehavior = "edge-swipe" | "button" | "escape-key" | "breadcrumb";
export type GestureOwner = "os" | "app"; // "app" ⇒ patterns inject a recognizer
export type WindowingMode = "isolated" | "tabbed" | "multi-window";
export type BridgeType = "webkit" | "standard-web";

export interface EnvironmentProfile {
  device: DeviceType;
  viewport: ViewportClass;
  orientation: Orientation;
  launch: { mode: LaunchMode; displayMode: DisplayMode };

  input: {
    primary: InputPrimary;
    touch: boolean;
    hover: boolean;
    keyboard: boolean;
    coarsePointer: boolean;
    finePointer: boolean;
  };

  layout: {
    mode: LayoutMode;
    density: Density;
    sidebar: SidebarMode;
    list: PaneMode;
    content: PaneMode;
    inspector: InspectorMode;
  };

  navigation: {
    mode: NavigationMode;
    transition: Transition;
    backBehavior: BackBehavior;
    gestureOwner: GestureOwner;
  };

  surface: {
    safeArea: { top: number; right: number; bottom: number; left: number };
    keyboard: { visible: boolean; height: number; offset: number };
    chrome: { topInsetAware: boolean; bottomInsetAware: boolean };
  };

  capabilities: {
    pwa: boolean;
    serviceWorker: boolean;
    offlineCache: boolean;
    push: boolean;
    notifications: boolean;
    clipboard: boolean;
    canShare: boolean;
    windowingMode: WindowingMode;
    bridgeType: BridgeType;
  };

  isResolved: boolean; // false on first client render, true after hydration
}

export interface SensorSnapshot {
  device: { type: DeviceType; viewport: ViewportClass; orientation: Orientation };
  launch: { mode: LaunchMode; displayMode: DisplayMode };
  input: Pick<
    EnvironmentProfile["input"],
    "touch" | "hover" | "keyboard" | "coarsePointer" | "finePointer"
  >;
  safeArea: EnvironmentProfile["surface"]["safeArea"];
  keyboard: EnvironmentProfile["surface"]["keyboard"];
  capability: Omit<EnvironmentProfile["capabilities"], "windowingMode" | "bridgeType">;
  isResolved: boolean;
}
