import type { DeviceType } from "./device.types";

/** Floor widths (px) at which each larger device class begins. */
export const BREAKPOINTS = {
  /** iPad / tablet starts here (768px = 48rem). Below it is iPhone (ios). */
  ipad: 768,
  /** Desktop starts here (1024px = 64rem). */
  desktop: 1024,
} as const;

/**
 * `matchMedia` query strings, one per *mutually-exclusive* viewport class — the
 * exact width ranges. (For *and-up* styling prefer the Tailwind `ipad:` /
 * `desktop:` variants in CSS.)
 */
export const DEVICE_QUERY: Record<DeviceType, string> = {
  ios: `(max-width: ${BREAKPOINTS.ipad - 0.02}px)`,
  ipad: `(min-width: ${BREAKPOINTS.ipad}px) and (max-width: ${BREAKPOINTS.desktop - 0.02}px)`,
  desktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
};

/** True in a browser where `matchMedia` exists (false during SSR / build). */
export const canMatchMedia = (): boolean =>
  typeof window !== "undefined" && typeof window.matchMedia === "function";

// ---- Hardware / user-agent signals (static helpers) ----

const userAgent = (): string => (typeof navigator !== "undefined" ? navigator.userAgent : "");

const maxTouchPoints = (): number =>
  typeof navigator !== "undefined" ? navigator.maxTouchPoints || 0 : 0;

/** Apple phone (iPhone / iPod) by user-agent. */
export function isIPhone(): boolean {
  return /iPhone|iPod/.test(userAgent());
}

/**
 * iPad — including iPadOS 13+ "desktop-class" Safari, which reports a Mac
 * user-agent. We disambiguate it from a real Mac via the touchscreen: Macs
 * don't have one, iPads do (`maxTouchPoints > 1`).
 */
export function isIPadOS(): boolean {
  const ua = userAgent();
  if (/iPad/.test(ua)) return true;
  const platform = typeof navigator !== "undefined" ? navigator.platform || "" : "";
  return (platform === "MacIntel" || /Macintosh/.test(ua)) && maxTouchPoints() > 1;
}

/** Touch-capable hardware (coarse pointer / touchscreen). SSR-safe. */
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    maxTouchPoints() > 0 ||
    (canMatchMedia() && window.matchMedia("(pointer: coarse)").matches)
  );
}

/** Any iOS hardware — iPhone or iPad (capability-aware). */
export function isIOS(): boolean {
  return isIPhone() || isIPadOS();
}
