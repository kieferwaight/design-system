import { isPWA } from "../device-detector";
import type { Sensor } from "./sensor.types";

export interface CapabilitySensorValue {
  pwa: boolean;
  serviceWorker: boolean;
  offlineCache: boolean;
  push: boolean;
  notifications: boolean;
  clipboard: boolean;
  canShare: boolean;
}

export class CapabilitySensor implements Sensor<CapabilitySensorValue> {
  read(): CapabilitySensorValue {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return {
        pwa: false,
        serviceWorker: false,
        offlineCache: false,
        push: false,
        notifications: false,
        clipboard: false,
        canShare: false,
      };
    }

    return {
      pwa: isPWA(),
      serviceWorker: "serviceWorker" in navigator,
      offlineCache: "caches" in window,
      push: "PushManager" in window,
      notifications: "Notification" in window,
      clipboard: "clipboard" in navigator,
      canShare: "share" in navigator,
    };
  }

  subscribe(_onValueChange?: () => void): () => void {
    // API capabilities are static properties of the browser engine and do not change after initialization
    return () => {};
  }
}
