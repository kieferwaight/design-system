export type DeviceType = "ios" | "ipad" | "desktop";

export type ViewportClass = DeviceType;

export type DisplayMode = "standalone" | "fullscreen" | "minimal-ui" | "browser";

export type LaunchMode = "browser" | "standalone" | "pwa";

export interface LaunchState {
  /** Installed-PWA context (launched from the home screen / app icon). */
  isPWA: boolean;
  /**
   * In iOS Safari as a normal browser tab — the audience for an
   * "Add to Home Screen" prompt (iOS hardware AND not installed).
   */
  isSafariBrowser: boolean;
  /** iOS hardware (iPhone / iPad). */
  isIOS: boolean;
  /** The active `display-mode`. */
  displayMode: DisplayMode;
}

export interface DeviceState {
  /** Capability-aware classification (hardware for real Apple devices). */
  type: DeviceType;
  /** Pure width classification (drives responsive layout). */
  viewport: DeviceType;
  touch: boolean;
  standalone: boolean;
}
