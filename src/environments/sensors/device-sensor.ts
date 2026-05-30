import type { DeviceType, ViewportClass } from "@/foundations/device";
import { getDeviceType, getViewportClass } from "../device-detector";
import type { Orientation } from "../environment.types";
import type { Sensor } from "./sensor.types";

export interface DeviceSensorValue {
  type: DeviceType;
  viewport: ViewportClass;
  orientation: Orientation;
}

export class DeviceSensor implements Sensor<DeviceSensorValue> {
  private fallback: DeviceType;

  constructor(fallback: DeviceType = "desktop") {
    this.fallback = fallback;
  }

  read(): DeviceSensorValue {
    if (typeof window === "undefined") {
      return {
        type: this.fallback,
        viewport: this.fallback,
        orientation: "landscape",
      };
    }

    const type = getDeviceType(this.fallback);
    const viewport = getViewportClass(this.fallback);
    const orientation = window.innerHeight >= window.innerWidth ? "portrait" : "landscape";

    return { type, viewport, orientation };
  }

  subscribe(onValueChange: () => void): () => void {
    if (typeof window === "undefined") return () => {};

    window.addEventListener("resize", onValueChange);
    window.addEventListener("orientationchange", onValueChange);

    return () => {
      window.removeEventListener("resize", onValueChange);
      window.removeEventListener("orientationchange", onValueChange);
    };
  }
}
