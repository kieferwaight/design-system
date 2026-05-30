import type {
  BridgeType,
  EnvironmentProfile,
  InputPrimary,
  SensorSnapshot,
  WindowingMode,
} from "./environment.types";
import { desktopProfile, iosProfile, ipadProfile } from "./profiles";

/**
 * Pure resolver mapping sensor snapshots to concrete environment decisions.
 * Maps hardware states to the standard layout and navigation profile and applies launch-context overrides.
 */
export function resolveEnvironment(snapshot: SensorSnapshot): EnvironmentProfile {
  const device = snapshot.device.type;
  const viewport = snapshot.device.viewport;
  const orientation = snapshot.device.orientation;
  const launch = snapshot.launch;

  // 1. Resolve base profile by device type
  let baseProfile = iosProfile;
  if (device === "ipad") {
    baseProfile = ipadProfile;
  } else if (device === "desktop") {
    baseProfile = desktopProfile;
  }

  // 2. Resolve primary input mode
  let primary: InputPrimary = "keyboard-pointer";
  if (snapshot.input.touch) {
    if (snapshot.input.finePointer) {
      primary = "hybrid";
    } else {
      primary = "touch";
    }
  } else {
    primary = "keyboard-pointer";
  }

  // 3. Resolve standalone iOS/iPad gesture owners & chrome insets awareness
  let gestureOwner = baseProfile.navigation.gestureOwner;
  let topInsetAware = false;
  let bottomInsetAware = false;

  const isIOSLike = device === "ios" || device === "ipad";
  const isStandalone = launch.mode === "standalone" || launch.mode === "pwa";

  if (isIOSLike && isStandalone) {
    gestureOwner = "app";
    topInsetAware = true;
  } else if (device === "ios" && launch.mode === "browser") {
    gestureOwner = "os";
    bottomInsetAware = true;
  }

  // 4. Resolve windowing mode
  let windowingMode: WindowingMode = "tabbed";
  if (device === "desktop" && isStandalone) {
    windowingMode = "multi-window";
  } else if (isIOSLike && isStandalone) {
    windowingMode = "isolated";
  } else {
    windowingMode = "tabbed";
  }

  // 5. Resolve native bridge type
  const bridgeType: BridgeType = isIOSLike ? "webkit" : "standard-web";

  return {
    device,
    viewport,
    orientation,
    launch,
    input: {
      primary,
      touch: snapshot.input.touch,
      hover: snapshot.input.hover,
      keyboard: snapshot.input.keyboard,
      coarsePointer: snapshot.input.coarsePointer,
      finePointer: snapshot.input.finePointer,
    },
    layout: {
      ...baseProfile.layout,
    },
    navigation: {
      ...baseProfile.navigation,
      gestureOwner,
    },
    surface: {
      safeArea: { ...snapshot.safeArea },
      keyboard: { ...snapshot.keyboard },
      chrome: {
        topInsetAware,
        bottomInsetAware,
      },
    },
    capabilities: {
      ...snapshot.capability,
      windowingMode,
      bridgeType,
    },
    isResolved: snapshot.isResolved,
  };
}
