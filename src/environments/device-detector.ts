import type { DeviceState, DeviceType, DisplayMode, LaunchState } from "@/foundations/device";
import {
  canMatchMedia,
  DEVICE_QUERY,
  isIOS,
  isIPadOS,
  isIPhone,
  isTouchDevice,
} from "@/foundations/device";

/** Largest → smallest device order; evaluated top-down in `getViewportClass`. */
const ORDER: readonly DeviceType[] = ["desktop", "ipad", "ios"];

/**
 * The device class from the viewport **width** only — ignores hardware. This is
 * what responsive layout should follow, and it mirrors the Tailwind
 * breakpoints. SSR-safe: returns `fallback` (default `"desktop"`).
 */
export function getViewportClass(fallback: DeviceType = "desktop"): DeviceType {
  if (!canMatchMedia()) return fallback;
  return ORDER.find((d) => window.matchMedia(DEVICE_QUERY[d]).matches) ?? fallback;
}

const legacyStandalone = (): boolean =>
  typeof navigator !== "undefined" &&
  // `navigator.standalone` is a non-standard legacy iOS Safari flag.
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

/** The active CSS `display-mode`. SSR-safe: returns `"browser"`. */
export function getDisplayMode(): DisplayMode {
  if (canMatchMedia()) {
    const installedModes: readonly Exclude<DisplayMode, "browser">[] = [
      "fullscreen",
      "standalone",
      "minimal-ui",
    ];
    for (const m of installedModes) {
      if (window.matchMedia(`(display-mode: ${m})`).matches) return m;
    }
  }
  return legacyStandalone() ? "standalone" : "browser";
}

/** App launched as an installed standalone PWA (incl. legacy iOS Safari). */
export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    (canMatchMedia() && window.matchMedia("(display-mode: standalone)").matches) ||
    legacyStandalone()
  );
}

/**
 * Running as an installed PWA — any non-`browser` display-mode (standalone,
 * fullscreen, or minimal-ui). Broader than `isStandalone`.
 */
export function isPWA(): boolean {
  if (typeof window === "undefined") return false;
  return getDisplayMode() !== "browser";
}

/** Read the full launch mode once (non-reactive). SSR-safe. */
export function getLaunchMode(): LaunchState {
  const pwa = isPWA();
  const ios = isIOS();
  return {
    isPWA: pwa,
    isSafariBrowser: ios && !pwa,
    isIOS: ios,
    displayMode: getDisplayMode(),
  };
}

/**
 * Capability-aware device type. Real iPhones/iPads are pinned by user-agent
 * (correct in any orientation); everything else falls back to the viewport
 * width class. SSR-safe: returns `fallback` (default `"desktop"`).
 */
export function getDeviceType(fallback: DeviceType = "desktop"): DeviceType {
  if (typeof window === "undefined") return fallback;
  if (isIPadOS()) return "ipad";
  if (isIPhone()) return "ios";
  return getViewportClass(fallback);
}

/** Read the full device state once (non-reactive). SSR-safe. */
export function getDeviceState(fallback: DeviceType = "desktop"): DeviceState {
  return {
    type: getDeviceType(fallback),
    viewport: getViewportClass(fallback),
    touch: isTouchDevice(),
    standalone: isStandalone(),
  };
}

/**
 * Reflect the current device state onto a root element as data-attributes, so
 * CSS can target capability — not just width.
 */
export function applyDeviceAttributes(root?: HTMLElement): () => void {
  if (!canMatchMedia()) return () => {};
  const el = root ?? document.documentElement;
  const update = () => {
    el.dataset.device = getDeviceType();
    el.dataset.viewport = getViewportClass();
    el.dataset.displayMode = getDisplayMode();
    el.toggleAttribute("data-touch", isTouchDevice());
    el.toggleAttribute("data-standalone", isStandalone());
    el.toggleAttribute("data-pwa", isPWA());
  };
  update();
  const mqls = [
    ...Object.values(DEVICE_QUERY),
    "(pointer: coarse)",
    "(display-mode: standalone)",
    "(display-mode: fullscreen)",
    "(display-mode: minimal-ui)",
    "(display-mode: browser)",
  ].map((q) => window.matchMedia(q));
  for (const m of mqls) m.addEventListener("change", update);
  return () => {
    for (const m of mqls) m.removeEventListener("change", update);
  };
}
