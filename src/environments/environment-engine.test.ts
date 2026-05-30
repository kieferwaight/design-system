import { describe, expect, it } from "vitest";
import type { SensorSnapshot } from "./environment.types";
import { resolveEnvironment } from "./environment-engine";

describe("resolveEnvironment", () => {
  const baseSnapshot: SensorSnapshot = {
    device: { type: "desktop", viewport: "desktop", orientation: "landscape" },
    launch: { mode: "browser", displayMode: "browser" },
    input: {
      touch: false,
      hover: true,
      keyboard: true,
      coarsePointer: false,
      finePointer: true,
    },
    safeArea: { top: 0, right: 0, bottom: 0, left: 0 },
    keyboard: { visible: false, height: 0, offset: 0 },
    capability: {
      pwa: false,
      serviceWorker: false,
      offlineCache: false,
      push: false,
      notifications: false,
      clipboard: false,
      canShare: false,
    },
    isResolved: true,
  };

  it("should resolve desktop browser profile successfully", () => {
    const profile = resolveEnvironment(baseSnapshot);
    expect(profile.device).toBe("desktop");
    expect(profile.layout.mode).toBe("three-pane");
    expect(profile.layout.density).toBe("expanded");
    expect(profile.navigation.mode).toBe("multi-pane");
    expect(profile.navigation.transition).toBe("none");
    expect(profile.navigation.backBehavior).toBe("escape-key");
    expect(profile.capabilities.windowingMode).toBe("tabbed");
  });

  it("should resolve iOS Safari browser tab profile successfully", () => {
    const snapshot: SensorSnapshot = {
      ...baseSnapshot,
      device: { type: "ios", viewport: "ios", orientation: "portrait" },
      launch: { mode: "browser", displayMode: "browser" },
      input: {
        touch: true,
        hover: false,
        keyboard: true,
        coarsePointer: true,
        finePointer: false,
      },
    };

    const profile = resolveEnvironment(snapshot);
    expect(profile.device).toBe("ios");
    expect(profile.layout.mode).toBe("single-screen-stack");
    expect(profile.layout.density).toBe("compact");
    expect(profile.navigation.transition).toBe("ios-slide");
    expect(profile.navigation.gestureOwner).toBe("os");
    expect(profile.surface.chrome.bottomInsetAware).toBe(true);
    expect(profile.surface.chrome.topInsetAware).toBe(false);
  });

  it("should resolve iOS standalone PWA profile successfully", () => {
    const snapshot: SensorSnapshot = {
      ...baseSnapshot,
      device: { type: "ios", viewport: "ios", orientation: "portrait" },
      launch: { mode: "standalone", displayMode: "standalone" },
      input: {
        touch: true,
        hover: false,
        keyboard: true,
        coarsePointer: true,
        finePointer: false,
      },
    };

    const profile = resolveEnvironment(snapshot);
    expect(profile.device).toBe("ios");
    expect(profile.navigation.gestureOwner).toBe("app");
    expect(profile.surface.chrome.topInsetAware).toBe(true);
    expect(profile.surface.chrome.bottomInsetAware).toBe(false);
    expect(profile.capabilities.windowingMode).toBe("isolated");
  });

  it("should resolve iPad touch profile successfully", () => {
    const snapshot: SensorSnapshot = {
      ...baseSnapshot,
      device: { type: "ipad", viewport: "ipad", orientation: "landscape" },
      input: {
        touch: true,
        hover: false,
        keyboard: true,
        coarsePointer: true,
        finePointer: false,
      },
    };

    const profile = resolveEnvironment(snapshot);
    expect(profile.device).toBe("ipad");
    expect(profile.layout.mode).toBe("split-view");
    expect(profile.layout.density).toBe("regular");
    expect(profile.input.primary).toBe("touch");
  });

  it("should resolve iPad hybrid fine pointer profile successfully", () => {
    const snapshot: SensorSnapshot = {
      ...baseSnapshot,
      device: { type: "ipad", viewport: "ipad", orientation: "landscape" },
      input: {
        touch: true,
        hover: true,
        keyboard: true,
        coarsePointer: true,
        finePointer: true,
      },
    };

    const profile = resolveEnvironment(snapshot);
    expect(profile.device).toBe("ipad");
    expect(profile.input.primary).toBe("hybrid");
  });
});
