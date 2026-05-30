import { useCallback, useSyncExternalStore } from "react";
import type { DeviceState, DeviceType, DisplayMode, LaunchState } from "@/foundations/device";
import { canMatchMedia, DEVICE_QUERY, isIOS } from "@/foundations/device";
import { getDeviceType, getDisplayMode, getViewportClass } from "./device-detector";

/**
 * React hooks for device-type / media-query state. All are SSR-safe via
 * `useSyncExternalStore` — it returns the server snapshot during render and on
 * first hydration, then re-renders with the real value, so there is no
 * hydration-mismatch warning and no tearing.
 */

/**
 * Subscribe to a CSS media query. `serverDefault` is what SSR / first paint
 * reports before the client knows the real match.
 *
 *     const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
 */
export function useMediaQuery(query: string, serverDefault = false): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!canMatchMedia()) return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => (canMatchMedia() ? window.matchMedia(query).matches : serverDefault),
    () => serverDefault,
  );
}

/** Subscribe to every width query plus pointer changes — the device-state inputs. */
function subscribeDeviceState(onStoreChange: () => void): () => void {
  if (!canMatchMedia()) return () => {};
  const mqls = [...Object.values(DEVICE_QUERY), "(pointer: coarse)"].map((q) =>
    window.matchMedia(q),
  );
  for (const m of mqls) m.addEventListener("change", onStoreChange);
  return () => {
    for (const m of mqls) m.removeEventListener("change", onStoreChange);
  };
}

/**
 * Capability-aware device type — `"ios" | "ipad" | "desktop"`. Real iPhones /
 * iPads are pinned by user-agent (correct in any orientation); everything else
 * follows the viewport width. Use for *behavior* (touch targets, native
 * gestures). `serverDefault` is used during SSR / first paint.
 */
export function useDeviceType(serverDefault: DeviceType = "desktop"): DeviceType {
  return useSyncExternalStore(
    subscribeDeviceState,
    () => getDeviceType(serverDefault),
    () => serverDefault,
  );
}

/**
 * Pure viewport width class — ignores hardware. Use for responsive *layout*
 * (it mirrors the Tailwind `ipad:` / `desktop:` variants).
 */
export function useViewportClass(serverDefault: DeviceType = "desktop"): DeviceType {
  const subscribe = useCallback((onStoreChange: () => void) => {
    if (!canMatchMedia()) return () => {};
    const mqls = Object.values(DEVICE_QUERY).map((q) => window.matchMedia(q));
    for (const m of mqls) m.addEventListener("change", onStoreChange);
    return () => {
      for (const m of mqls) m.removeEventListener("change", onStoreChange);
    };
  }, []);
  return useSyncExternalStore(
    subscribe,
    () => getViewportClass(serverDefault),
    () => serverDefault,
  );
}

/** `true` on iPhone hardware (capability-aware). */
export const useIsIOS = (): boolean => useDeviceType() === "ios";
/** `true` on iPad hardware (capability-aware — any orientation). */
export const useIsIPad = (): boolean => useDeviceType() === "ipad";
/** `true` on desktop. */
export const useIsDesktop = (): boolean => useDeviceType() === "desktop";

/** Touch-capable hardware (coarse pointer), reactive to pointer changes. */
export const useIsTouch = (): boolean => useMediaQuery("(pointer: coarse)");

/** App running as an installed standalone PWA (home-screen launch). */
export const useIsStandalone = (): boolean => useMediaQuery("(display-mode: standalone)");

/** Subscribe to every `display-mode` so the launch state stays reactive. */
function subscribeDisplayMode(onStoreChange: () => void): () => void {
  if (!canMatchMedia()) return () => {};
  const mqls = ["standalone", "fullscreen", "minimal-ui", "browser"].map((m) =>
    window.matchMedia(`(display-mode: ${m})`),
  );
  for (const m of mqls) m.addEventListener("change", onStoreChange);
  return () => {
    for (const m of mqls) m.removeEventListener("change", onStoreChange);
  };
}

/** The active CSS `display-mode`, reactive. `serverDefault` used during SSR. */
export function useDisplayMode(serverDefault: DisplayMode = "browser"): DisplayMode {
  return useSyncExternalStore(
    subscribeDisplayMode,
    () => getDisplayMode(),
    () => serverDefault,
  );
}

/** Installed as a PWA (any non-`browser` display-mode). */
export const useIsPWA = (): boolean => useDisplayMode() !== "browser";

/**
 * How the app was launched — installed PWA vs iOS Safari tab. Use
 * `isSafariBrowser` to gate an "Add to Home Screen" prompt. Reactive to
 * display-mode changes; the iOS-hardware signal is static.
 */
export function useLaunchMode(): LaunchState {
  const displayMode = useDisplayMode();
  const pwa = displayMode !== "browser";
  const ios = isIOS();
  return { isPWA: pwa, isSafariBrowser: ios && !pwa, isIOS: ios, displayMode };
}

/**
 * The full device state in one reactive object: capability-aware `type`, the
 * pure-width `viewport`, plus `touch` / `standalone` flags.
 */
export function useDeviceState(serverDefault: DeviceType = "desktop"): DeviceState {
  return {
    type: useDeviceType(serverDefault),
    viewport: useViewportClass(serverDefault),
    touch: useIsTouch(),
    standalone: useIsStandalone(),
  };
}
