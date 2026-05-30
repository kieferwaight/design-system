import { useContext, useSyncExternalStore } from "react";
import { EnvironmentContext } from "./EnvironmentProvider";
import type { EnvironmentProfile } from "./environment.types";
import { resolveEnvironment } from "./environment-engine";

/**
 * Hook to consume the complete resolved environment profile.
 * SSR-safe and guarantees no tearing during active platform resizing.
 */
export function useEnvironment(): EnvironmentProfile {
  const store = useContext(EnvironmentContext);
  if (!store) {
    throw new Error("useEnvironment must be used within an EnvironmentProvider");
  }

  const snapshot = useSyncExternalStore(
    (listener) => store.subscribe(listener),
    () => store.getSnapshot(),
    () => store.getSnapshot(),
  );

  return resolveEnvironment(snapshot);
}

/** Consumes the layout configuration sub-slice of the profile. */
export function useEnvironmentLayout() {
  return useEnvironment().layout;
}

/** Consumes the dynamic physical safe area inset coordinates. */
export function useSafeArea() {
  return useEnvironment().surface.safeArea;
}

/** Consumes the virtual keyboard inset height and offset attributes. */
export function useKeyboardInset() {
  return useEnvironment().surface.keyboard;
}
