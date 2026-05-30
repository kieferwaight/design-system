import type { DisplayMode, LaunchMode } from "@/foundations/device";
import { getDisplayMode } from "../device-detector";
import type { Sensor } from "./sensor.types";

export interface LaunchSensorValue {
  mode: LaunchMode;
  displayMode: DisplayMode;
}

export class LaunchSensor implements Sensor<LaunchSensorValue> {
  read(): LaunchSensorValue {
    if (typeof window === "undefined") {
      return { mode: "browser", displayMode: "browser" };
    }

    const displayMode = getDisplayMode();
    let mode: LaunchMode = "browser";
    if (displayMode === "standalone") {
      mode = "standalone";
    } else if (displayMode === "fullscreen" || displayMode === "minimal-ui") {
      mode = "pwa";
    }

    return { mode, displayMode };
  }

  subscribe(onValueChange: () => void): () => void {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return () => {};
    }

    const mqls = ["standalone", "fullscreen", "minimal-ui", "browser"].map((m) =>
      window.matchMedia(`(display-mode: ${m})`),
    );

    for (const m of mqls) {
      m.addEventListener("change", onValueChange);
    }

    return () => {
      for (const m of mqls) {
        m.removeEventListener("change", onValueChange);
      }
    };
  }
}
